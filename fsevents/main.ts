import { getFsevents } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { FileError } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/errors.ts";
import { readDir } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";
import { MacosError } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/errors.ts";
import { Fsevents } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/types/macos/fsevents.d.ts";

/**
 * Parse FsEvents requries root permissions
 * @returns Array of FsEvent records that include "rs"
 */
async function main() {
  const fs_data: Fsevents[] = [];
  const fsevents_path = "/System/Volumes/Data/.fseventsd";
  const result = await readDir(fsevents_path);
  if (result instanceof FileError) {
    return;
  }
  for (const entry of result) {
    if (!entry.is_file) {
      continue;
    }
    const fsevents_file = `${fsevents_path}/${entry.filename}`;
    const info = getFsevents(fsevents_file);
    if (info instanceof MacosError) {
      console.log(`runtime issue: ${info}`);
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
