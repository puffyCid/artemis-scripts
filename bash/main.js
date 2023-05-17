// https://github.com/puffycid/artemis-api/src/unix/shell_history.ts
function get_bash_history() {
  const data = Deno[Deno.internal].core.ops.get_bash_history();
  const history = JSON.parse(data);
  return history;
}

// https://github.com/puffycid/artemis-api/mod.ts
function getBashHistory() {
  return get_bash_history();
}

// main.ts
function main() {
  const data = getBashHistory();
  return data;
}
main();
