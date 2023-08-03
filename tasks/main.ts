import { getTaskFile } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { glob } from "https://raw.githubusercontent.com/puffycid/artemis-api/main/src/filesystem/mod.ts";

function main() {
  const xml_files = glob("C:\\Windows\\System32\\Tasks\\*");
  if (xml_files instanceof Error) {
    console.error(`Got globbing error! ${xml_files}`);
    return xml_files;
  }

  for (const entry of xml_files) {
    if (!entry.is_file) {
      continue;
    }

    return getTaskFile(entry.full_path);
  }
}

main();
