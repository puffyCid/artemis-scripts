import { getChromiumHistory } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { RawChromiumHistory } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/applications/chromium.ts";

function main() {
  return recurse_dir("/Users");
}

/**
 * Simple function to recursively walk the filesystem
 * @param start_path Directory to transverse
 */
function recurse_dir(
  start_path: string,
): RawChromiumHistory[] | null {
  let results = null;
  for (const entry of Deno.readDirSync(start_path)) {
    const path = `${start_path}/${entry.name}`;

    if (path.includes("test_data") && entry.name == "History" && entry.isFile) {
      results = getChromiumHistory(path);
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
