import { getUserAssist } from "https://github.com/puffycid/artemis-api/mod.ts";
import { UserAssist } from "https://github.com/puffycid/artemis-api/src/windows/userassist.ts";
import {
  crypto,
  toHashString,
} from "https://deno.land/std@0.173.0/crypto/mod.ts";

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
      const info = Deno.statSync(entry.path);
      const data = Deno.readFileSync(entry.path);
      const hash = crypto.subtle.digestSync("MD5", data);

      const enhance: EnhancedUserAssist = {
        path: entry.path,
        count: entry.count,
        folder_path: entry.folder_path,
        rot_path: entry.rot_path,
        reg_path: entry.reg_path,
        last_execution: entry.last_execution,
        md5: toHashString(hash),
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
