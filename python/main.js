// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/unix/shell_history.ts
function get_python_history() {
  const data = Deno[Deno.internal].core.ops.get_python_history();
  const history = JSON.parse(data);
  return history;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getPythonHistory() {
  return get_python_history();
}

// main.ts
function main() {
  const data = getPythonHistory();
  return data;
}
main();
