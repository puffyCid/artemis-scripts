import { getPythonHistory } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

function main() {
  const data = getPythonHistory();

  return data;
}

main();
