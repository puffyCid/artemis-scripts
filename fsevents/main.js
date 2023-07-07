// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/fsevents.ts
function get_fsevents(path) {
  const data = Deno[Deno.internal].core.ops.get_fsevents(path);
  if (data === "") {
    return null;
  }
  const fsevents = JSON.parse(data);
  return fsevents;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getFsEvents(path) {
  return get_fsevents(path);
}

// main.ts
function main() {
  const fs_data = [];
  const fsevents_path = "/System/Volumes/Data/.fseventsd";
  for (const entry of Deno.readDirSync(fsevents_path)) {
    if (!entry.isFile) {
      continue;
    }
    const fsevents_file = `${fsevents_path}/${entry.name}`;
    const info = getFsEvents(fsevents_file);
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
