import { getSafariDownloads } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { RawSafariDownloads } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/applications/safari.ts";
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
): Promise<RawSafariDownloads[] | null> {
  let results = null;
  const result = await readDir(start_path);
  if (result instanceof Error) {
    return [];
  }
  for (const entry of result) {
    const path = `${start_path}/${entry.filename}`;

    if (
      path.includes("test_data") && entry.filename == "Downloads.plist" &&
      entry.is_file
    ) {
      results = getSafariDownloads(path);
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
