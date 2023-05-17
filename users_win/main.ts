import { getAltUsersWin } from "https://github.com/puffycid/artemis-api/mod.ts";
import { UserInfo } from "https://github.com/puffycid/artemis-api/src/windows/users.ts";

function main(): UserInfo[] {
  const drive = Deno.env.get("SystemDrive");
  if (drive === undefined) {
    return [];
  }
  const users = getAltUsersWin(drive);
  return users;
}

main();
