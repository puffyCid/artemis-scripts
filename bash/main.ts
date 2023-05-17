import { getBashHistory } from "https://github.com/puffycid/artemis-api/mod.ts";

function main() {
  const data = getBashHistory();

  return data;
}

main();
