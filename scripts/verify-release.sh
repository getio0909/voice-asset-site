#!/usr/bin/env bash

set -euo pipefail

usage() {
  echo "usage: $0 <version> <release-directory> [--require-sbom]" >&2
}

fail() {
  echo "verify-release: $*" >&2
  exit 1
}

if (( $# < 2 || $# > 3 )); then
  usage
  exit 2
fi

version=$1
release_argument=$2
require_sbom=false
if (( $# == 3 )); then
  [[ $3 == --require-sbom ]] || {
    usage
    exit 2
  }
  require_sbom=true
fi

[[ $version =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?$ ]] ||
  fail "invalid semantic version tag: $version"
[[ -d $release_argument ]] || fail "release directory does not exist: $release_argument"
release_dir=$(cd -- "$release_argument" && pwd -P)
repo_root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P)

for command in node tar sha256sum mktemp diff find awk grep tr; do
  command -v "$command" >/dev/null 2>&1 || fail "required command is unavailable: $command"
done

cd -- "$repo_root"
package_version=$(node -p "require('./package.json').version")
base_version=${version#v}
base_version=${base_version%%-*}
base_version=${base_version%%+*}
[[ $base_version == "$package_version" ]] ||
  fail "tag $version does not match package version v$package_version"
[[ -f dist/index.html && -f dist/en/index.html ]] ||
  fail "localized dist output is missing; run pnpm test first"

archive_name="voiceasset-site-$version.tar.gz"
license_name=third-party-licenses.json
sbom_name=voiceasset-site-source.cdx.json
expected_names=(SHA256SUMS "$archive_name" "$license_name")
if $require_sbom || [[ -e $release_dir/$sbom_name ]]; then
  expected_names+=("$sbom_name")
fi
mapfile -t expected_names < <(printf '%s\n' "${expected_names[@]}" | LC_ALL=C sort)
mapfile -t actual_names < <(
  find "$release_dir" -mindepth 1 -maxdepth 1 -printf '%f\n' | LC_ALL=C sort
)
[[ $(printf '%s\n' "${actual_names[@]}") == $(printf '%s\n' "${expected_names[@]}") ]] ||
  fail "release directory contains missing or unexpected files"

for name in "${actual_names[@]}"; do
  [[ -f $release_dir/$name && ! -L $release_dir/$name ]] ||
    fail "release entry must be a regular, non-symlink file: $name"
done
if $require_sbom; then
  [[ -f $release_dir/$sbom_name ]] || fail "required CycloneDX SBOM is missing"
fi

shopt -s nullglob
artifact_paths=("$release_dir"/*.tar.gz "$release_dir"/*.json)
mapfile -t expected_checksum_names < <(
  for artifact in "${artifact_paths[@]}"; do
    printf './%s\n' "$(basename -- "$artifact")"
  done | LC_ALL=C sort
)
mapfile -t checksum_names < <(
  awk '{name = $2; sub(/^\*/, "", name); print name}' "$release_dir/SHA256SUMS" | LC_ALL=C sort
)
[[ $(printf '%s\n' "${checksum_names[@]}") == $(printf '%s\n' "${expected_checksum_names[@]}") ]] ||
  fail "SHA256SUMS does not cover exactly the release artifacts"
while read -r checksum name extra; do
  [[ -z ${extra:-} && $checksum =~ ^[0-9a-f]{64}$ && $name == \*./* ]] ||
    fail "malformed SHA256SUMS entry"
done <"$release_dir/SHA256SUMS"
(
  cd -- "$release_dir"
  sha256sum -c SHA256SUMS
)

node -e '
  const fs = require("node:fs");
  const value = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
  if (!value || Array.isArray(value) || typeof value !== "object" || Object.keys(value).length === 0) {
    throw new Error("license inventory must be a non-empty JSON object");
  }
' "$release_dir/$license_name"
if [[ -f $release_dir/$sbom_name ]]; then
  node -e '
    const fs = require("node:fs");
    const value = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
    if (value.bomFormat !== "CycloneDX") {
      throw new Error("SBOM is not CycloneDX JSON");
    }
  ' "$release_dir/$sbom_name"
fi

archive="$release_dir/$archive_name"
temp_root=$(cd -- "${TMPDIR:-/tmp}" && pwd -P)
staging=$(mktemp -d "$temp_root/voiceasset-site-verify.XXXXXX")
listing="$staging/archive.list"
extracted="$staging/extracted"
cleanup() {
  case $staging in
    "$temp_root"/voiceasset-site-verify.*) rm -rf -- "$staging" ;;
    *) echo "verify-release: refusing to clean unexpected path: $staging" >&2 ;;
  esac
}
trap cleanup EXIT

tar -tzf "$archive" >"$listing"
[[ -s $listing ]] || fail "archive is empty: $archive_name"
while IFS= read -r entry; do
  [[ $entry == . || $entry == ./ || $entry == ./* ]] || fail "unsafe archive root: $entry"
  relative=${entry#./}
  [[ $relative != /* && ! $relative =~ (^|/)\.\.(/|$) ]] || fail "unsafe archive path: $entry"
done <"$listing"

mkdir -p -- "$extracted"
tar -xzf "$archive" -C "$extracted"
[[ -z $(find "$extracted" -type l -print -quit) ]] || fail "archive contains a symbolic link"
diff --brief --recursive "$repo_root/dist" "$extracted" >/dev/null ||
  fail "archive contents differ from the validated dist directory"
for required in index.html en/index.html openapi.yaml release-notes/index.html en/release-notes/index.html; do
  [[ -f $extracted/$required ]] || fail "archive is missing $required"
done

contract_version=$(tr -d '[:space:]' <"$repo_root/CONTRACT_VERSION")
grep -Fq -- "version: $contract_version" "$extracted/openapi.yaml" ||
  fail "packaged OpenAPI does not contain contract $contract_version"

echo "verified deterministic Site bundle, license inventory, and SHA-256 checksums"
