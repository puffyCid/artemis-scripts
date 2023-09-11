import { getRecycleBin } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/recyclebin.ts";

function main() {
  const bin = getRecycleBin();
  return bin;
}
main();
