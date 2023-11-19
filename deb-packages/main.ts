import { getDebInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/linux/deb.ts";

function main() {
  const packages = getDebInfo();
  console.log(packages);
}

main();
