import { getCustomShimdb } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { getEnvValue } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/environment/mod.ts";
import { readDir } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";
import { Shimdb } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/shimdb.ts";

/**
 * Search for custom sdb files in all User directories.
 * Custom sdb files are typically at `C:\\Windows\\apppatch\\Custom\\Custom{64}` but they can actually be anywhere
 * @returns Array of custom shimdb data
 */
function main(): Shimdb[] {
  const drive = getEnvValue("SystemDrive");
  if (drive === "") {
    return [];
  }

  const users = `${drive}\\Users`;
  const custom_sdb: Shimdb[] = [];
  recurse_dir(custom_sdb, users);

  return custom_sdb;
}

async function recurse_dir(sdbs: Shimdb[], start_path: string) {
  for await (const entry of readDir(start_path)) {
    const sdb_path = `${start_path}\\${entry.filename}`;
    // A custom SDB file can exist anywhere and can have any extension
    // We read all files (smaller than 10MB) and check for a the sdb file signature
    if (entry.is_file) {
      const data = getCustomShimdb(sdb_path);
      // Since we are checking all files, null is returned for non-sdb files
      if (data === null) {
        continue;
      }

      sdbs.push(data);
    }

    if (entry.is_directory) {
      recurse_dir(sdbs, sdb_path);
    }
  }
}

main();
