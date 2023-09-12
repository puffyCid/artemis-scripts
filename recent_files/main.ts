import { getLnkFile } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { getEnvValue } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/environment/mod.ts";
import { readDir } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";
import { Shortcut } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/types/windows/shortcuts.d.ts";

async function main() {
  const drive = getEnvValue("SystemDrive");
  if (drive === "") {
    return [];
  }

  const users = `${drive}\\Users`;
  const recent_files: Shortcut[] = [];
  const result = await readDir(users);
  if (result instanceof Error) {
    return;
  }
  for (const entry of result) {
    try {
      const path =
        `${users}\\${entry.filename}\\AppData\\Roaming\\Microsoft\\Windows\\Recent`;
      const lnk_entry = await readDir(path);
      if (lnk_entry instanceof Error) {
        continue;
      }
      for (const entry of lnk_entry) {
        if (!entry.filename.endsWith("lnk")) {
          continue;
        }
        const lnk_file = `${path}\\${entry.filename}`;
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
