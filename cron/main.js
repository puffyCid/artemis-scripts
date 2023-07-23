// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/unix/cron.ts
function get_cron() {
  const data = Deno.core.ops.get_cron();
  const history = JSON.parse(data);
  return history;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getCron() {
  return get_cron();
}

// main.ts
function main() {
  const data = getCron();
  return data;
}
main();
