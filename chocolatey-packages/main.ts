import { getChocolateyInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/chocolatey.ts";

function main() {
  const data = getChocolateyInfo();
  console.log(data);
}

main();
