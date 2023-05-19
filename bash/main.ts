import { getBashHistory } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

function main() {
  const data = getBashHistory();

  return data;
}

main();
