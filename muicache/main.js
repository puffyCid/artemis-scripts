// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/registry.ts
function get_registry(path) {
  const data = Deno.core.ops.get_registry(path);
  const reg_array = JSON.parse(data);
  return reg_array;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getRegistry(path) {
  return get_registry(path);
}

// main.ts
function main() {
  const drive = getEnvValue("SystemDrive");
  if (drive === void 0) {
    return [];
  }
  const mui_array = [];
  const users = `${drive}\\Users`;
  for (const entry of readDir(users)) {
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
            const muicache = {
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
