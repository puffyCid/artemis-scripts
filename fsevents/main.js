// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/fsevents.ts
function getFsevents(path) {
  const data = Deno.core.ops.get_fsevents(path);
  if (data === "") {
    return null;
  }
  const fsevents = JSON.parse(data);
  return fsevents;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/directory.ts
function readDir(path) {
  const data = fs.readDir(path);
  return data;
}

// main.ts
async function main() {
  const fs_data = [];
  const fsevents_path = "/System/Volumes/Data/.fseventsd";
  for await (const entry of readDir(fsevents_path)) {
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
