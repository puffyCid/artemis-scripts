import { getChromiumDownloads } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { glob } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/files.ts";

function main() {
  const paths = glob(
    "/Users/*/Library/Application Support/Chromium/Default/History",
  );
  if (paths instanceof Error) {
    return;
  }

  for (const path of paths) {
    return getChromiumDownloads(path.full_path);
  }
}

main();
