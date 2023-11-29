import { getSysteminfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { SystemInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/systeminfo.ts";

function main(): SystemInfo {
  const info = getSysteminfo();
  return info;
}

main();
