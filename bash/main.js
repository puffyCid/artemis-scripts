// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/unix/shell_history.ts
function get_bash_history() {
  const data = Deno.core.ops.get_bash_history();
  const history = JSON.parse(data);
  return history;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getBashHistory() {
  return get_bash_history();
}

// main.ts
function main() {
  const data = getBashHistory();
  return data;
}
main();
