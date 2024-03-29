import { readAdsData } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import {
  readDir,
  stat,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";
import { getEnvValue } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/environment/mod.ts";
import { extractUtf8String } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/encoding/mod.ts";

interface MarkOfWebFiles {
  /**Full path to file */
  path: string;
  /**Strings associated with mark of the web */
  mark: string;
  /**Standard Information timestamp */
  created: number;
  /**Standard Information timestamp */
  modified: number;
  /**Standard Information timestamp */
  accessed: number;
  /**Size of file */
  size: number;
}

/**
 * Read the `Mark of the web` (ADS) data associated with files in all User downloads directories
 * `https://redcanary.com/blog/iso-files/`
 */
async function main() {
  const drive = getEnvValue("SystemDrive");
  if (drive === "") {
    return [];
  }
  const web_files = [];
  const users = `${drive}\\Users`;
  const result = await readDir(users);
  if (result instanceof Error) {
    return;
  }
  for (const entry of result) {
    try {
      const path = `${users}\\${entry.filename}\\Downloads`;
      const path_entry = await readDir(path);
      if (path_entry instanceof Error) {
        return;
      }
      for (const file_entry of path_entry) {
        try {
          if (!file_entry.is_file) {
            continue;
          }
          const full_path = `${path}\\${file_entry.filename}`;
          const ads = "Zone.Identifier";

          const data = readAdsData(full_path, ads);

          // Check if mark of the web was not found (zero bytes read)
          if (data.length === 0) {
            continue;
          }
          const info = stat(full_path);

          // Mark of the web data is actually just a bunch of strings
          const mark_info = extractUtf8String(data);
          const web_file: MarkOfWebFiles = {
            mark: mark_info,
            path: full_path,
            created: info.created,
            modified: info.modified,
            accessed: info.accessed,
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
