import { getAltUserassist } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { glob } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/files.ts";
import { UserAssist } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/types/windows/userassist.d.ts";

function main(): UserAssist[] {
  const paths = glob("C:\\Users\\*\\NTUSER.DAT");
  if (paths instanceof Error) {
    return [];
  }

  for (const path of paths) {
    const assist = getAltUserassist(path.full_path, false);
    return assist;
  }
  return [];
}

main();
