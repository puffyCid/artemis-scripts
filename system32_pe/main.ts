import { getPe } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { PeInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/pe.ts";

interface FileMeta {
  path: string;
  pe: PeInfo;
}

/**
 * Parse `pe` files at `\Windows\System32`
 * @returns Array of pe metadata
 */
function main(): FileMeta[] {
  const drive = Deno.env.get("SystemDrive");
  if (drive === undefined) {
    return [];
  }
  const path = `${drive}\\Windows\\System32`;

  const pes: FileMeta[] = [];
  for (const entry of Deno.readDirSync(path)) {
    if (!entry.isFile) {
      continue;
    }

    const pe_path = `${path}\\${entry.name}`;
    const info = getPe(pe_path);
    if (info === null) {
      continue;
    }
    const meta: FileMeta = {
      path: pe_path,
      pe: info,
    };
    pes.push(meta);
  }
  return pes;
}

main();
