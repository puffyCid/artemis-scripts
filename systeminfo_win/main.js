// https://github.com/puffycid/artemis-api/src/windows/systeminfo.ts
function get_systeminfo_win() {
  const data = Deno[Deno.internal].core.ops.get_users();
  const info = JSON.parse(data);
  return info;
}

// https://github.com/puffycid/artemis-api/mod.ts
function getSystemInfoWin() {
  return get_systeminfo_win();
}

// main.ts
function main() {
  const info = getSystemInfoWin();
  return info;
}
main();
