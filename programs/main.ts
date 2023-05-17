import { getRegistry } from "https://github.com/puffycid/artemis-api/mod.ts";
import { Registry } from "https://github.com/puffycid/artemis-api/src/windows/registry.ts";

interface InstalledPrograms {
  name: string;
  version: string;
  install_location: string;
  install_source: string;
  language: string;
  publisher: string;
  install_string: string;
  install_date: string;
  uninstall_string: string;
  url_info: string;
  reg_path: string;
}

function grab_info(reg: Registry[]): InstalledPrograms[] {
  const programs: InstalledPrograms[] = [];
  const min_size = 3;
  for (const entries of reg) {
    if (entries.values.length < min_size) {
      continue;
    }
    const program: InstalledPrograms = {
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
      reg_path: entries.path,
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
  const programs: Registry[] = [];
  for (const entries of reg) {
    if (
      !entries.path.includes(
        "Microsoft\\Windows\\CurrentVersion\\Uninstall",
      )
    ) {
      continue;
    }
    programs.push(entries);
  }
  return grab_info(programs);
}

main();
