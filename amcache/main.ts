import { getAmcache } from "https://github.com/puffycid/artemis-api/mod.ts";
import { Amcache } from "https://github.com/puffycid/artemis-api/src/windows/amache.ts";

function main(): Amcache[] {
  const cache = getAmcache();
  return cache;
}

main();
