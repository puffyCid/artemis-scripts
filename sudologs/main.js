// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/unix/sudologs.ts
function getMacosSudoLogs() {
  const data = Deno.core.ops.get_sudologs();
  const log_data = JSON.parse(data);
  return log_data;
}

// main.ts
function main() {
  const data = getMacosSudoLogs();
  return data;
}
main();
