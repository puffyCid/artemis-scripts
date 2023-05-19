import { getMacho } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { MachoInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/macho.ts";

interface FileMeta {
  path: string;
  macho: MachoInfo[];
}

/**
 * Parse `macho` files at `/bin`
 * @returns Array of macho metadata
 */
function main() {
  const bin_path = "/bin";

  const machos: FileMeta[] = [];
  for (const entry of Deno.readDirSync(bin_path)) {
    if (!entry.isFile) {
      continue;
    }
    const macho_path = `${bin_path}/${entry.name}`;
    const info = getMacho(macho_path);
    if (info === null) {
      continue;
    }
    const meta: FileMeta = {
      path: macho_path,
      macho: info,
    };
    machos.push(meta);
  }
  return machos;
}

main();
