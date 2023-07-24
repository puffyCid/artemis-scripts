import { getAltUsersWin } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { UserInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/users.ts";

function main(): UserInfo[] {
  const users = getAltUsersWin("C");
  return users;
}

main();
