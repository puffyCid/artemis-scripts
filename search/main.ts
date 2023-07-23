import { getSearch } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { getEnvValue } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/environment/mod.ts";
import { stat } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";
import { SearchEntry } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/search.ts";

/**
 * Simple script to parse Windows Search database.
 * This is not a ideal script, the Search database can get very large, this script will make `artemis` parse the whole database and return all of its contents at once.
 *
 * A better way would be to create a filter script that accepts a `SearchEntry[]` argument (See `search_filter`)
 * @returns Array of `SearchEntry`
 */
function main(): SearchEntry[] {
  const drive = getEnvValue("SystemDrive");
  if (drive === "") {
    return [];
  }
  const path =
    `${drive}\\ProgramData\\Microsoft\\Search\\Data\\Applications\\Windows`;
  try {
    const search_path = `${path}\\Windows.edb`;
    const status = stat(search_path);
    if (!status.is_file) {
      // This is odd...
      return [];
    }
    const results = getSearch(search_path);
    return results;
  } catch (_e) {
    const search_path = `${path}\\Windows.db`;
    const status = stat(search_path);
    if (!status.is_file) {
      // This is odd...
      return [];
    }
    const results = getSearch(search_path);
    return results;
  }
}

main();
