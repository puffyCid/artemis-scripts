import { getFirefoxHistory } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { glob } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";

/**
 * Parse Firefox history for artemis test file
 * @returns Array of FirefoxHistory entries
 */
function main() {
  const paths = glob(
    "/Users/*/Library/Application Support/Firefox/Profiles/*.default-release/places.sqlite",
  );
  if (paths instanceof Error) {
    return;
  }

  for (const path of paths) {
    return getFirefoxHistory(path.full_path);
  }
}

main();
