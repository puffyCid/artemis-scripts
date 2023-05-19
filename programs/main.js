// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/registry.ts
function get_registry(path) {
  const data = Deno[Deno.internal].core.ops.get_registry(path);
  const reg_array = JSON.parse(data);
  return reg_array;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getRegistry(path) {
  return get_registry(path);
}

// main.ts
function grab_info(reg) {
  const programs = [];
  const min_size = 3;
  for (const entries of reg) {
    if (entries.values.length < min_size) {
      continue;
    }
    const program = {
      name: "",
      version: "",
      install_location: "",
      install_source: "",
      language: "",
      publisher: "",
      install_string: "",
      install_date: "",
      uninstall_string: "",
      url_info: "",
      reg_path: entries.path
    };
    for (const value of entries.values) {
      switch (value.value) {
        case "DisplayName":
          program.name = value.data;
          break;
        case "DisplayVersion":
          program.version = value.data;
          break;
        case "InstallDate":
          program.install_date = value.data;
          break;
        case "InstallLocation":
          program.install_location = value.data;
          break;
        case "InstallSource":
          program.install_source = value.data;
          break;
        case "Language":
          program.language = value.data;
          break;
        case "Publisher":
          program.publisher = value.data;
          break;
        case "UninstallString":
          program.uninstall_string = value.data;
          break;
        case "URLInfoAbout":
          program.url_info = value.data;
          break;
        default:
          continue;
      }
    }
    programs.push(program);
  }
  return programs;
}
function main() {
  const path = "C:\\Windows\\System32\\config\\SOFTWARE";
  const reg = getRegistry(path);
  const programs = [];
  for (const entries of reg) {
    if (!entries.path.includes(
      "Microsoft\\Windows\\CurrentVersion\\Uninstall"
    )) {
      continue;
    }
    programs.push(entries);
  }
  return grab_info(programs);
}
main();
