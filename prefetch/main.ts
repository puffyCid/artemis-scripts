import { getPrefetch } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

/**
 * Get all prefetch data at default path (C:\Windows\Prefetch)
 * @returns Array of Prefetch data
 */
function main() {
  const pf = getPrefetch();
  return pf;
}

main();
