import { getFirefoxDownloads } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { RawFirefoxDownloads } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/applications/firefox.ts";
import { readDir } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";

async function main() {
  return await recurse_dir("/Users");
}

/**
 * Simple function to recursively walk the filesystem
 * @param start_path Directory to transverse
 */
async function recurse_dir(
  start_path: string,
): Promise<RawFirefoxDownloads[] | null> {
  let results = null;
  for await (const entry of readDir(start_path)) {
    const path = `${start_path}/${entry.filename}`;

    if (
      path.includes("test_data") &&
      entry.filename == "places_downloads.sqlite" &&
      entry.is_file
    ) {
      results = getFirefoxDownloads(path);
      return results;
    }

    if (entry.is_directory) {
      try {
        results = await recurse_dir(path);
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
