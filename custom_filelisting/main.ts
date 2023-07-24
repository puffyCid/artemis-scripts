import { readDir } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";

async function main() {
  const start = "/";

  const files = await readDir(start);

  return files;
}

main();
