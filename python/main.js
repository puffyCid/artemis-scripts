// https://github.com/puffycid/artemis-api/src/unix/shell_history.ts
function get_python_history() {
  const data = Deno[Deno.internal].core.ops.get_python_history();
  const history = JSON.parse(data);
  return history;
}

// https://github.com/puffycid/artemis-api/mod.ts
function getPythonHistory() {
  return get_python_history();
}

// main.ts
function main() {
  const data = getPythonHistory();
  return data;
}
main();
