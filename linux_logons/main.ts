import { getLogon } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

/**
 * A more advance script would parse all logon files (`utmp`, `wtmp`, `btmp`) and the Journal files to capture all logon activity
 * @returns Array of `Logon` entries
 */
function main() {
  const wtmp = "/var/log/wtmp";
  const results = getLogon(wtmp);
  return results;
}

main();
