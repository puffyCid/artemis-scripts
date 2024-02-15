import { getAltAmcache } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { Amcache } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/types/windows/amcache.d.ts";

function main(): Amcache[] {
  const cache = getAltAmcache("C:\\Windows\\appcompat\\Programs\\Amcache.hve");
  return cache;
}

main();
