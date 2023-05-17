import { readAdsData } from "https://github.com/puffycid/artemis-api/mod.ts";

interface MarkOfWebFiles {
  /**Full path to file */
  path: string;
  /**Strings associated with mark of the web */
  mark: string;
  /**Standard Information timestamp */
  created: Date;
  /**Standard Information timestamp */
  modified: Date;
  /**Standard Information timestamp */
  accessed: Date;
  /**Size of file */
  size: number;
}

/**
 * Read the `Mark of the web` (ADS) data associated with files in all User downloads directories
 * `https://redcanary.com/blog/iso-files/`
 */
function main() {
  const drive = Deno.env.get("SystemDrive");
  if (drive === undefined) {
    return [];
  }
  const web_files = [];
  const users = `${drive}\\Users`;
  for (const entry of Deno.readDirSync(users)) {
    try {
      const path = `${users}\\${entry.name}\\Downloads`;
      for (const file_entry of Deno.readDirSync(path)) {
        try {
          if (!file_entry.isFile) {
            continue;
          }
          const full_path = `${path}\\${file_entry.name}`;
          const ads = "Zone.Identifier";

          const data = readAdsData(full_path, ads);

          // Check if mark of the web was not found (zero bytes read)
          if (data.length === 0) {
            continue;
          }
          const info = Deno.statSync(full_path);
          // Skip files if we cant get timestamps
          if (
            info.mtime === null ||
            info.birthtime === null ||
            info.atime === null
          ) {
            continue;
          }
          // Mark of the web data is actually just a bunch of strings
          const mark_info = new TextDecoder().decode(data);
          const web_file: MarkOfWebFiles = {
            mark: mark_info,
            path: full_path,
            created: info.birthtime,
            modified: info.mtime,
            accessed: info.atime,
            size: info.size,
          };

          web_files.push(web_file);
        } catch (_error) {
          continue;
        }
      }
    } catch (_error) {
      continue;
    }
  }
  return web_files;
}

main();
