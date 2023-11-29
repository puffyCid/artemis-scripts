import { wifiNetworks } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/plist/wifi.ts";

function main() {
  const data = wifiNetworks();
  console.log(data[ 0 ].name);
}

main();