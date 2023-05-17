import { getUserAssist } from "https://github.com/puffycid/artemis-api/mod.ts";
import { UserAssist } from "https://github.com/puffycid/artemis-api/src/windows/userassist.ts";

function main(): UserAssist[] {
  const assist = getUserAssist();
  return assist;
}

main();
