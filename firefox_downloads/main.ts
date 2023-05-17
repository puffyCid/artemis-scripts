import { getFirefoxDownloads } from "https://github.com/puffycid/artemis-api/mod.ts";
import { RawFirefoxDownloads } from "https://github.com/puffycid/artemis-api/src/applications/firefox.ts";

function main() {
  return recurse_dir("/Users");
}

/**
 * Simple function to recursively walk the filesystem
 * @param start_path Directory to transverse
 */
function recurse_dir(
  start_path: string,
): RawFirefoxDownloads[] | null {
  let results = null;
  for (const entry of Deno.readDirSync(start_path)) {
    const path = `${start_path}/${entry.name}`;

    if (
      path.includes("test_data") && entry.name == "places_downloads.sqlite" &&
      entry.isFile
    ) {
      results = getFirefoxDownloads(path);
      return results;
    }

    if (entry.isDirectory) {
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
