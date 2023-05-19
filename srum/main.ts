import { getSrumApplicationInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { ApplicationInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/srum.ts";

function main(): ApplicationInfo[] {
  const path = "C:\\Windows\\System32\\sru\\SRUDB.dat";
  const entries = getSrumApplicationInfo(path);
  return entries;
}

main();
