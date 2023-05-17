// https://github.com/puffycid/artemis-api/src/windows/users.ts
function get_alt_users_win(drive) {
  const data = Deno[Deno.internal].core.ops.get_alt_users(drive);
  const user_array = JSON.parse(data);
  return user_array;
}

// https://github.com/puffycid/artemis-api/mod.ts
function getAltUsersWin(drive) {
  return get_alt_users_win(drive);
}

// main.ts
function main() {
  const drive = Deno.env.get("SystemDrive");
  if (drive === void 0) {
    return [];
  }
  const users = getAltUsersWin(drive);
  return users;
}
main();
