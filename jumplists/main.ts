import { glob } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/files.ts";
import { getJumplistPath } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/jumplists.ts";

function main() {
  const paths = glob("C:\\Users\\*\\AppData\\Roaming\\Microsoft\\Windows\\Recent\\*Destinations\\*")
  if (paths instanceof Error) {
    console.error("Error with Jumplists glob");
    return;
  }
  for (const path of paths) {
    const jump = getJumplistPath(path.full_path);
    return jump;
  }

}

main();