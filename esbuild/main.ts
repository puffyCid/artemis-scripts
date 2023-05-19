import { getWinProcesses } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { WindowsProcessInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/processes.ts";

function main(): WindowsProcessInfo[] {
  const md5 = true;
  const sha1 = false;
  const sha256 = false;
  const pe_info = true;

  const proc_list = getWinProcesses(md5, sha1, sha256, pe_info);
  return proc_list;
}

main();
