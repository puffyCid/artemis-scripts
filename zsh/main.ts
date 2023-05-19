import { getZshHistory } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

function main() {
  const data = getZshHistory();

  return data;
}

main();
