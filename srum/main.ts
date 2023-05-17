import { getSrumApplicationInfo } from "https://github.com/puffycid/artemis-api/mod.ts";
import { ApplicationInfo } from "https://github.com/puffycid/artemis-api/src/windows/srum.ts";

function main(): ApplicationInfo[] {
  const path = "C:\\Windows\\System32\\sru\\SRUDB.dat";
  const entries = getSrumApplicationInfo(path);
  return entries;
}

main();
