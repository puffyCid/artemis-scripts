import { getSystemInfoWin } from "https://github.com/puffycid/artemis-api/mod.ts";
import { SystemInfo } from "https://github.com/puffycid/artemis-api/src/windows/systeminfo.ts";

function main(): SystemInfo {
  const info = getSystemInfoWin();
  return info;
}

main();
