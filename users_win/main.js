// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/users.ts
function get_alt_users_win(drive) {
  const data = Deno.core.ops.get_alt_users(drive);
  const user_array = JSON.parse(data);
  return user_array;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getAltUsersWin(drive) {
  return get_alt_users_win(drive);
}

// main.ts
function main() {
  const drive = getEnvValue("SystemDrive");
  if (drive === void 0) {
    return [];
  }
  const users = getAltUsersWin(drive);
  return users;
}
main();
