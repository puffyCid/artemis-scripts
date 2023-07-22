import { getMacosSudoLogs } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

function main() {
  const data = getMacosSudoLogs();

  return data;
}

main();
