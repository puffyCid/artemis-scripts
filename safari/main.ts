import { getSafariHistory } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { RawSafariHistory } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/applications/safari.ts";
import { readDir } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";

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
): Promise<RawSafariHistory[] | null> {
  let results = null;
  for (const entry of await readDir(start_path)) {
    const path = `${start_path}/${entry.filename}`;

    if (
      path.includes("test_data") && entry.filename == "History.db" &&
      entry.is_file
    ) {
      results = getSafariHistory(path);
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
