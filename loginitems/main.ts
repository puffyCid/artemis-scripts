import { getLoginItems } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

/**
 * Parse LoginItems
 * @returns Array of LoginItems
 */
function main() {
  const data = getLoginItems();

  return data;
}

main();
