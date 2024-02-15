import { getAltShellbags } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { glob } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/files.ts";

/**
 * @returns Array of `Shellbags`
 */
function main() {
  const paths = glob("C:\\Users\\*\\NTUSER.DAT");
  if (paths instanceof Error) {
    return [];
  }
  for (const path of paths) {
    const resolve_guids = true;
    const bags = getAltShellbags(resolve_guids, path.full_path);
    return bags;
  }

  return [];
}

main();
