// https://github.com/puffycid/artemis-api/src/unix/shell_history.ts
function get_zsh_history() {
  const data = Deno[Deno.internal].core.ops.get_zsh_history();
  const history = JSON.parse(data);
  return history;
}

// https://github.com/puffycid/artemis-api/mod.ts
function getZshHistory() {
  return get_zsh_history();
}

// main.ts
function main() {
  const data = getZshHistory();
  return data;
}
main();
