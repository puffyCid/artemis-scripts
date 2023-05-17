import { getPrefetch } from "https://github.com/puffycid/artemis-api/mod.ts";

/**
 * Get all prefetch data at default path (C:\Windows\Prefetch)
 * @returns Array of Prefetch data
 */
function main() {
  const pf = getPrefetch();
  return pf;
}

main();
