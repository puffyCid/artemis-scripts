import { getLoginitems } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

/**
 * Parse LoginItems
 * @returns Array of LoginItems
 */
function main() {
  const data = getLoginitems();

  return data;
}

main();
