import {
  getLaunchdAgents,
  getLaunchdDaemons,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

function main() {
  const agents = getLaunchdAgents();
  const daemons = getLaunchdDaemons();

  return agents.concat(daemons);
}
main();
