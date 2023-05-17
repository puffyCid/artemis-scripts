import { getEmond } from "https://github.com/puffycid/artemis-api/mod.ts";

/**
 * Parse Emond rules
 * @returns Array of Emond rules
 */
function main() {
  const data = getEmond();

  return data;
}

main();
