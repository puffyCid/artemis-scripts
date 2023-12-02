import { getMacho } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { FileError } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/errors.ts";
import { readDir } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";
import { MacosError } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/errors.ts";
import { MachoInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/types/macos/macho.d.ts";

interface FileMeta {
  path: string;
  macho: MachoInfo[];
}

/**
 * Parse `macho` files at `/bin`
 * @returns Array of macho metadata
 */
async function main() {
  const bin_path = "/bin";

  const machos: FileMeta[] = [];
  const result = await readDir(bin_path);
  if (result instanceof FileError) {
    return;
  }
  for (const entry of result) {
    if (!entry.is_file) {
      continue;
    }
    const macho_path = `${bin_path}/${entry.filename}`;
    const info = getMacho(macho_path);
    if (info instanceof MacosError) {
      continue;
    }
    const meta: FileMeta = {
      path: macho_path,
      macho: info,
    };
    machos.push(meta);
  }
  console.log(machos);
  return machos;
}

main();
