import { getHomebrewInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/homebrew.ts";

function main() {
  const info = getHomebrewInfo();
  console.log(info);
  return info;
}

main();