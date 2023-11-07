import { executeCommand } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/command.ts";

function main() {
  const command = "ls";
  const args = ["-l", "-h", "-a"];

  const results = executeCommand(command, args);
  return results;
}

main();
