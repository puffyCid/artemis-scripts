import { getUserassist } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { UserAssist } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/types/windows/userassist.d.ts";

function main(): UserAssist[] {
  const assist = getUserassist(false);
  return assist;
}

main();
