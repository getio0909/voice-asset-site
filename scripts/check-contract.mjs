import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const version = (
  await readFile(new URL("CONTRACT_VERSION", root), "utf8")
).trim();

if (!/^\d+\.\d+\.\d+$/.test(version)) {
  throw new Error(`Invalid CONTRACT_VERSION: ${JSON.stringify(version)}`);
}

const expectations = [
  ["README.md", `contract \`${version}\``],
  ["src/content/docs/project-status.md", `OpenAPI ${version}`],
  ["src/content/docs/en/project-status.md", `OpenAPI ${version}`],
];

for (const [path, marker] of expectations) {
  const content = await readFile(new URL(path, root), "utf8");
  if (!content.includes(marker)) {
    throw new Error(`${path} does not record Server contract ${version}`);
  }
}

console.log(`Server contract ${version} is recorded consistently.`);
