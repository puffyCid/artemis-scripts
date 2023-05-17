import { getLaunchdAgents, getLaunchdDaemons } from "https://github.com/puffycid/artemis-api/mod.ts";

function main() {
  const agents = getLaunchdAgents();
  const daemons = getLaunchdDaemons();

  return agents.concat(daemons);
}
main();
