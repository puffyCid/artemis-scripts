import {
  hash,
  readDir,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";

async function main() {
  const start = "/";

  const files = readDir(start);
  for await (const entry of files) {
    if (!entry.is_file) {
      continue;
    }
    const hashes = hash(entry.full_path, true, false, false);
    return hashes;
  }
}

main();
