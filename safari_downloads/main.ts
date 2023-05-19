import { getSafariDownloads } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { RawSafariDownloads } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/applications/safari.ts";

function main() {
  const bin_path = "/Users";

  return recurse_dir(bin_path);
}

/**
 * Simple function to recursively walk the filesystem
 * @param start_path Directory to transverse
 */
function recurse_dir(
  start_path: string,
): RawSafariDownloads[] | null {
  let results = null;
  for (const entry of Deno.readDirSync(start_path)) {
    const path = `${start_path}/${entry.name}`;

    if (
      path.includes("test_data") && entry.name == "Downloads.plist" &&
      entry.isFile
    ) {
      results = getSafariDownloads(path);
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
