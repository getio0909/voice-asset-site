import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const entryPath = resolve("dist/pagefind/pagefind-entry.json");
const entry = JSON.parse(await readFile(entryPath, "utf8"));

if (
  !entry.languages ||
  Array.isArray(entry.languages) ||
  typeof entry.languages !== "object"
) {
  throw new Error("Pagefind entry does not contain a languages object");
}

entry.languages = Object.fromEntries(
  Object.entries(entry.languages).sort(([left], [right]) =>
    left < right ? -1 : left > right ? 1 : 0,
  ),
);

await writeFile(entryPath, JSON.stringify(entry), "utf8");
console.log(
  `Normalized Pagefind language order: ${Object.keys(entry.languages).join(", ")}`,
);
