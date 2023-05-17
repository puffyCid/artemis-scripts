import { getSafariHistory } from "https://github.com/puffycid/artemis-api/mod.ts";
import { RawSafariHistory } from "https://github.com/puffycid/artemis-api/src/applications/safari.ts";

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
): RawSafariHistory[] | null {
  let results = null;
  for (const entry of Deno.readDirSync(start_path)) {
    const path = `${start_path}/${entry.name}`;

    if (
      path.includes("test_data") && entry.name == "History.db" &&
      entry.isFile
    ) {
      results = getSafariHistory(path);
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
