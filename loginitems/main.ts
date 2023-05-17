import { getLoginItems } from "https://github.com/puffycid/artemis-api/mod.ts";

/**
 * Parse LoginItems
 * @returns Array of LoginItems
 */
function main() {
  const data = getLoginItems();

  return data;
}

main();
