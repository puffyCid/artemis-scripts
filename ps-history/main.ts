import { powershellHistory } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/powershell.ts";
function main() {
  const data = powershellHistory();
  console.log(data);
}

main();
