// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/systeminfo.ts
function get_systeminfo_win() {
  const data = Deno[Deno.internal].core.ops.get_users();
  const info = JSON.parse(data);
  return info;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getSystemInfoWin() {
  return get_systeminfo_win();
}

// main.ts
function main() {
  const info = getSystemInfoWin();
  return info;
}
main();
