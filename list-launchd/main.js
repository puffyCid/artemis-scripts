// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/launchd.ts
function get_launchd_daemons() {
  const data = Deno.core.ops.get_launchd_daemons();
  const launchd_array = JSON.parse(data);
  return launchd_array;
}
function get_launchd_agents() {
  const data = Deno.core.ops.get_launchd_agents();
  const launchd_array = JSON.parse(data);
  return launchd_array;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getLaunchdAgents() {
  return get_launchd_agents();
}
function getLaunchdDaemons() {
  return get_launchd_daemons();
}

// main.ts
function main() {
  const agents = getLaunchdAgents();
  const daemons = getLaunchdDaemons();
  return agents.concat(daemons);
}
main();
