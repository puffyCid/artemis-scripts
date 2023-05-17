// https://github.com/puffycid/artemis-api/src/windows/registry.ts
function get_registry(path) {
  const data = Deno[Deno.internal].core.ops.get_registry(path);
  const reg_array = JSON.parse(data);
  return reg_array;
}

// https://github.com/puffycid/artemis-api/mod.ts
function getRegistry(path) {
  return get_registry(path);
}

// main.ts
function main() {
  const drive = Deno.env.get("SystemDrive");
  if (drive === void 0) {
    return [];
  }
  const office_array = [];
  const users = `${drive}\\Users`;
  for (const entry of Deno.readDirSync(users)) {
    try {
      const path = `${users}\\${entry.name}\\NTUSER.DAT`;
      const status = Deno.lstatSync(path);
      if (!status.isFile) {
        continue;
      }
      const reg_results = getRegistry(path);
      for (const reg_entry of reg_results) {
        if (
          !reg_entry.path.match(
            /Microsoft\\Office\\1(4|5|6)\.0\\.*\\(File MRU| User MRU\\.*\\File MRU)/,
          )
        ) {
          continue;
        }
        for (const value of reg_entry.values) {
          if (!value.value.includes("Item ")) {
            continue;
          }
          const windows_nano = 1e7;
          const seconds_to_unix = 11644473600;
          const filetime = parseInt(
            value.data.split("[T")[1].split("]")[0],
            16,
          );
          const unixepoch = filetime / windows_nano - seconds_to_unix;
          const mru = {
            file_path: value.data.split("*")[1],
            reg_path: reg_entry.path,
            last_opened: unixepoch,
            last_opened_filetime: filetime,
            reg_file_path: path,
          };
          office_array.push(mru);
        }
      }
    } catch (_e) {
      continue;
    }
  }
  return office_array;
}
main();
