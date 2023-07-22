import { FileInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/directory.ts";
import { readDir } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";

async function main() {
  const start = "/";

  const files = readDir(start);
  const data: FileInfo[] = [];
  for await (const entry of files) {
    if (typeof entry.inode === "bigint") {
      entry.inode = entry.inode.toString();
    }
    data.push(entry);
  }

  return data;
}

main();
