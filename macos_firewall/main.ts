import { firewallStatus } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/plist/firewall.ts";

function main() {
  const results = firewallStatus();
  if (results instanceof Error) {
    console.error(`Failed to get Firewall configuration: ${results}`);
  }
  return results;
}

main();
