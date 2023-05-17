import { getZshHistory } from "https://github.com/puffycid/artemis-api/mod.ts";

function main() {
  const data = getZshHistory();

  return data;
}

main();
