import { getFsevents } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { readDir } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";
import { Fsevents } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/fsevents.ts";

/**
 * Parse FsEvents requries root permissions
 * @returns Array of FsEvent records that include "rs"
 */
async function main() {
  const fs_data: Fsevents[] = [];
  const fsevents_path = "/System/Volumes/Data/.fseventsd";

  for (const entry of await readDir(fsevents_path)) {
    if (!entry.is_file) {
      continue;
    }
    const fsevents_file = `${fsevents_path}/${entry.filename}`;
    const info = getFsevents(fsevents_file);
    if (info === null) {
      continue;
    }

    for (const fsevent_entry of info) {
      if (!fsevent_entry.path.includes(".rs")) {
        continue;
      }
      fs_data.push(fsevent_entry);
    }
  }

  return fs_data;
}

main();
