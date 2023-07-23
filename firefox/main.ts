import { getFirefoxHistory } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { RawFirefoxHistory } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/applications/firefox.ts";
import { readDir } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";

/**
 * Parse Firefox history for artemis test file
 * @returns Array of FirefoxHistory entries
 */
async function main() {
  const bin_path = "/Users";

  return await recurse_dir(bin_path);
}

/**
 * Simple function to recursively walk the filesystem
 * @param start_path Directory to transverse
 */
async function recurse_dir(
  start_path: string,
): Promise<RawFirefoxHistory[] | null> {
  let results = null;
  for await (const entry of await readDir(start_path)) {
    const path = `${start_path}/${entry.filename}`;

    if (
      path.includes("test_data") && entry.filename == "places.sqlite" &&
      entry.is_file
    ) {
      results = getFirefoxHistory(path);
      return results;
    }

    if (entry.is_directory) {
      try {
        results = recurse_dir(path);
        if (results != null) {
          return results;
        }
      } catch (_e) {
        continue;
      }
    }
  }
  return results;
}

main();
