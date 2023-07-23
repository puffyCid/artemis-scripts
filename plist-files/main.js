// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/plist.ts
function getPlist(path) {
  const data = Deno.core.ops.get_plist(path);
  if (data === "") {
    return null;
  }
  const plist_data = JSON.parse(data);
  return plist_data;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/directory.ts
function readDir(path) {
  const data = fs.readDir(path);
  return data;
}

// main.ts
async function main() {
  const start_path = "/Users";
  const plist_files = [];
  await recurse_dir(plist_files, start_path);
  return plist_files;
}
async function recurse_dir(plist_files, start_path) {
  for await (const entry of readDir(start_path)) {
    const plist_path = `${start_path}/${entry.filename}`;
    if (entry.is_file && entry.filename.endsWith("plist")) {
      const data = getPlist(plist_path);
      if (data === null) {
        continue;
      }
      const plist_info = {
        plist_content: data,
        file: plist_path,
      };
      plist_files.push(plist_info);
      continue;
    }
    if (entry.is_directory) {
      await recurse_dir(plist_files, plist_path);
    }
  }
}
main();
