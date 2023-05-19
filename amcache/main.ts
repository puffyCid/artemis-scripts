import { getAmcache } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { Amcache } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/amache.ts";

function main(): Amcache[] {
  const cache = getAmcache();
  return cache;
}

main();
