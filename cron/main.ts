import { getCron } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

/**
 * Parse Cron jobs
 * @returns Array of Cron jobs
 */
function main() {
  const data = getCron();

  return data;
}

main();
