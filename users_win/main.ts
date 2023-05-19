import { getAltUsersWin } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { UserInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/users.ts";

function main(): UserInfo[] {
  const drive = Deno.env.get("SystemDrive");
  if (drive === undefined) {
    return [];
  }
  const users = getAltUsersWin(drive);
  return users;
}

main();
