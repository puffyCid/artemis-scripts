import { getRegistry } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

/**
 * MuiCache is a simple artifact that tracks applications executed from Explorer
 */
interface MuiCache {
  application: string;
  description: string;
}

function main(): MuiCache[] {
  const drive = Deno.env.get("SystemDrive");
  if (drive === undefined) {
    return [];
  }
  const mui_array: MuiCache[] = [];
  const users = `${drive}\\Users`;
  for (const entry of Deno.readDirSync(users)) {
    try {
      const path =
        `${users}\\${entry.name}\\AppData\\Local\\Microsoft\\Windows\\UsrClass.dat`;
      const status = Deno.lstatSync(path);
      if (!status.isFile) {
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
