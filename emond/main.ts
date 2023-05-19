import { getEmond } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

/**
 * Parse Emond rules
 * @returns Array of Emond rules
 */
function main() {
  const data = getEmond();

  return data;
}

main();
