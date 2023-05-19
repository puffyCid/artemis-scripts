import { getSystemInfoWin } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { SystemInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/systeminfo.ts";

function main(): SystemInfo {
  const info = getSystemInfoWin();
  return info;
}

main();
