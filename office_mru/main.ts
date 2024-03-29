import { getRegistry } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { getEnvValue } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/environment/mod.ts";
import {
  readDir,
  stat,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";

interface OfficeMRU {
  file_path: string;
  reg_path: string;
  /**Pretty sure OFficeMRU records last opened timestamp */
  last_opened: number;
  /**last opened but in Windows FILETIME */
  last_opened_filetime: number;
  reg_file_path: string;
}

/**
 * Simple script to return recent office documents. This script parsers all NTUSER.DAT files on a system.
 * It reads the raw Registry file (NTUSER.DAT) so even if the user is not logged on the Registry file will still get parsed
 * @returns Array of recently opened office documents
 */
async function main(): Promise<OfficeMRU[]> {
  const drive = getEnvValue("SystemDrive");
  if (drive === "") {
    return [];
  }
  const office_array: OfficeMRU[] = [];
  const users = `${drive}\\Users`;
  const result = await readDir(users);
  if (result instanceof Error) {
    return [];
  }
  // Get all users and try to parse their NTUSER.DAT file
  for (const entry of result) {
    try {
      const path = `${users}\\${entry.filename}\\NTUSER.DAT`;
      const status = stat(path);
      if (!status.is_file) {
        continue;
      }

      // Parse our registry file
      const reg_results = getRegistry(path);
      for (const reg_entry of reg_results) {
        // Only care about entries that match our regex for recent office documents
        if (
          !reg_entry.path.match(
            /Microsoft\\Office\\1(4|5|6)\.0\\.*\\(File MRU| User MRU\\.*\\File MRU)/,
          )
        ) {
          continue;
        }
        // If match, search for the document entries. They start with "Item "
        for (const value of reg_entry.values) {
          if (!value.value.includes("Item ")) {
            continue;
          }

          const windows_nano = 10000000;
          const seconds_to_unix = 11644473600;
          const filetime = parseInt(
            value.data.split("[T")[1].split("]")[0],
            16,
          );
          const unixepoch = filetime / windows_nano - seconds_to_unix;
          const mru: OfficeMRU = {
            file_path: value.data.split("*")[1],
            reg_path: reg_entry.path,
            last_opened: unixepoch,
            last_opened_filetime: filetime,
            reg_file_path: path,
          };
          office_array.push(mru);
        }
      }
    } catch (_e) {
      continue;
    }
  }
  return office_array;
}

main();
