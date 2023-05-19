import { getLnkFile } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { Shortcut } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/shortcuts.ts";

function main() {
  const drive = Deno.env.get("SystemDrive");
  if (drive === undefined) {
    return [];
  }

  const users = `${drive}\\Users`;
  const recent_files: Shortcut[] = [];
  for (const entry of Deno.readDirSync(users)) {
    try {
      const path =
        `${users}\\${entry.name}\\AppData\\Roaming\\Microsoft\\Windows\\Recent`;
      for (const entry of Deno.readDirSync(path)) {
        if (!entry.name.endsWith("lnk")) {
          continue;
        }
        const lnk_file = `${path}\\${entry.name}`;
        const lnk = getLnkFile(lnk_file);
        recent_files.push(lnk);
      }
    } catch (_error) {
      // If Recent directory is not found just continue
      continue;
    }
  }
  return recent_files;
}
main();
