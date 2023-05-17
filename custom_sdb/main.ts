import { getCustomShimdb } from "https://github.com/puffycid/artemis-api/mod.ts";
import { Shimdb } from "https://github.com/puffycid/artemis-api/src/windows/shimdb.ts";

/**
 * Search for custom sdb files in all User directories.
 * Custom sdb files are typically at `C:\\Windows\\apppatch\\Custom\\Custom{64}` but they can actually be anywhere
 * @returns Array of custom shimdb data
 */
function main(): Shimdb[] {
  const drive = Deno.env.get("SystemDrive");
  if (drive === undefined) {
    return [];
  }

  const users = `${drive}\\Users`;
  const custom_sdb: Shimdb[] = [];
  recurse_dir(custom_sdb, users);

  return custom_sdb;
}

function recurse_dir(sdbs: Shimdb[], start_path: string) {
  for (const entry of Deno.readDirSync(start_path)) {
    const sdb_path = `${start_path}\\${entry.name}`;
    // A custom SDB file can exist anywhere and can have any extension
    // We read all files (smaller than 10MB) and check for a the sdb file signature
    if (entry.isFile) {
      const data = getCustomShimdb(sdb_path);
      // Since we are checking all files, null is returned for non-sdb files
      if (data === null) {
        continue;
      }

      sdbs.push(data);
    }

    if (entry.isDirectory) {
      recurse_dir(sdbs, sdb_path);
    }
  }
}

main();
