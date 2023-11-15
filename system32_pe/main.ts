import { getPe } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { getEnvValue } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/environment/mod.ts";
import { FileError } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/errors.ts";
import { readDir } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";
import { WindowsError } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/errors.ts";
import { PeInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/types/windows/pe.d.ts";

interface FileMeta {
  path: string;
  pe: PeInfo;
}

/**
 * Parse `pe` files at `\Windows\System32`
 * @returns Array of pe metadata
 */
async function main(): Promise<FileMeta[]> {
  const drive = getEnvValue("SystemDrive");
  if (drive === "") {
    return [];
  }
  const path = `${drive}\\Windows\\System32`;

  const pes: FileMeta[] = [];
  const result = await readDir(path);
  if (result instanceof FileError) {
    return [];
  }
  for (const entry of result) {
    if (!entry.is_file) {
      continue;
    }

    const pe_path = `${path}\\${entry.filename}`;
    const info = getPe(pe_path);
    if (info instanceof WindowsError) {
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
