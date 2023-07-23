// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/unix/shell_history.ts
function get_zsh_history() {
  const data = Deno.core.ops.get_zsh_history();
  const history = JSON.parse(data);
  return history;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getZshHistory() {
  return get_zsh_history();
}

// main.ts
function main() {
  const data = getZshHistory();
  return data;
}
main();
