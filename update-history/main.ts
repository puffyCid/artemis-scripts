import { updateHistory } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/ese/updates.ts";

function main() {
  const data = updateHistory(
    "C:\\Windows\\SoftwareDistribution\\DataStore\\DataStore.edb",
  );
  console.log(data);
}

main();
