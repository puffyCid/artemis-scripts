// https://github.com/puffycid/artemis-api/src/unix/cron.ts
function get_cron() {
  const data = Deno[Deno.internal].core.ops.get_cron();
  const history = JSON.parse(data);
  return history;
}

// https://github.com/puffycid/artemis-api/mod.ts
function getCron() {
  return get_cron();
}

// main.ts
function main() {
  const data = getCron();
  return data;
}
main();
