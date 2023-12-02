import { passwordPolicy } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/plist/policies.ts";
function main() {
  const results = passwordPolicy();
  return results;
}
main();
