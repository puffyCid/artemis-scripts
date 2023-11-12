import { parseTable } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/ese.ts";

function main() {
  const db = "C:\\Windows\\security\\database\\secedit.sdb";
  const tables = ["SmTblSection"];
  const data = parseTable(db, tables);
  console.log(data);
}
main();
