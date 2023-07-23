import { getRegistry } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { getEnvValue } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/environment/mod.ts";
import {
  readDir,
  stat,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";

/**
 * MuiCache is a simple artifact that tracks applications executed from Explorer
 */
interface MuiCache {
  application: string;
  description: string;
}

async function main(): Promise<MuiCache[]> {
  const drive = getEnvValue("SystemDrive");
  if (drive === "") {
    return [];
  }
  const mui_array: MuiCache[] = [];
  const users = `${drive}\\Users`;
  for await (const entry of readDir(users)) {
    try {
      const path =
        `${users}\\${entry.filename}\\AppData\\Local\\Microsoft\\Windows\\UsrClass.dat`;
      const status = stat(path);
      if (!status.is_file) {
        continue;
      }

      const reg_results = getRegistry(path);
      for (const reg_entry of reg_results) {
        if (
          reg_entry.path.includes(
            "Local Settings\\Software\\Microsoft\\Windows\\Shell\\MuiCache",
          )
        ) {
          for (const value of reg_entry.values) {
            if (value.data_type != "REG_SZ") {
              continue;
            }
            const muicache: MuiCache = {
              application: value.value,
              description: value.data,
            };
            mui_array.push(muicache);
          }
        }
      }
    } catch (_e) {
      continue;
    }
  }
  return mui_array;
}

main();
