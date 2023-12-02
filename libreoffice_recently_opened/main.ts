import { recentFiles } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/applications/libreoffice.ts";
import { PlatformType } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/systeminfo.ts";

function main() {
  const results = recentFiles(PlatformType.Darwin);
  return results;
}
main();
