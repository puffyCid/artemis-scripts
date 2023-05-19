import { getShimdb } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { Shimdb } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/shimdb.ts";

/**
 * Parse Shimdb (SDB) files at default drive
 * This gets the default `sysmain.sdb` file and any custom SDB files at `C:\\Windows\\apppatch\\Custom\\Custom{64}`
 * @returns Array of custom shimdb data
 */
function main(): Shimdb[] {
  const sdb = getShimdb();
  return sdb;
}

main();
