import { getCron } from "https://github.com/puffycid/artemis-api/mod.ts";

/**
 * Parse Cron jobs
 * @returns Array of Cron jobs
 */
function main() {
  const data = getCron();

  return data;
}

main();
