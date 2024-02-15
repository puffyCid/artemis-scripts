import { getChromiumHistory } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { glob } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";

function main() {
  const paths = glob(
    "/Users/*/Library/Application Support/Chromium/Default/History",
  );
  if (paths instanceof Error) {
    return;
  }

  for (const path of paths) {
    return getChromiumHistory(path.full_path);
  }
}

main();
