import { getUserAssist } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { UserAssist } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/userassist.ts";
import { stat } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";
import { hash } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/files.ts";

interface EnhancedUserAssist extends UserAssist {
  md5: string;
  size: number;
}

/**
 * A small enhancement of the UserAssist data returned from Artemis
 * Note that some `UserAssist` entries use folder descriptions/GUIDs as part of there path.
 * @returns Array of UserAssist with MD5 hash and binary size if available
 */
function main(): EnhancedUserAssist[] {
  const assist = getUserAssist();

  const enhanced_assist: EnhancedUserAssist[] = [];
  for (const entry of assist) {
    try {
      const info = stat(entry.path);

      const enhance: EnhancedUserAssist = {
        path: entry.path,
        count: entry.count,
        folder_path: entry.folder_path,
        rot_path: entry.rot_path,
        reg_path: entry.reg_path,
        last_execution: entry.last_execution,
        md5: hash(entry.path, true, false, false).md5,
        size: info.size,
      };

      enhanced_assist.push(enhance);
    } catch (_error) {
      const enhance: EnhancedUserAssist = {
        path: entry.path,
        count: entry.count,
        folder_path: entry.folder_path,
        rot_path: entry.rot_path,
        reg_path: entry.reg_path,
        last_execution: entry.last_execution,
        md5: "",
        size: 0,
      };

      enhanced_assist.push(enhance);
    }
  }

  return enhanced_assist;
}

main();
