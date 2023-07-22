import { stat } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";

function main() {
  const target = "/Users";

  const data = stat(target);
  return data;
}

main();
