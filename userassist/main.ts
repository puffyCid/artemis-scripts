import { getUserAssist } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { UserAssist } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/userassist.ts";

function main(): UserAssist[] {
  const assist = getUserAssist();
  return assist;
}

main();
