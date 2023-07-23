import { getAltUsersWin } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { getEnvValue } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/environment/mod.ts";
import { UserInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/users.ts";

function main(): UserInfo[] {
  const drive = getEnvValue("SystemDrive");
  if (drive === "") {
    return [];
  }
  const users = getAltUsersWin(drive);
  return users;
}

main();
