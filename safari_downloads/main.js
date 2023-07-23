// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/safari.ts
function getSafariDownloads(path) {
  const data = Deno.core.ops.get_safari_downloads(path);
  const downloads = JSON.parse(data);
  return downloads;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/directory.ts
function readDir(path) {
  const data = fs.readDir(path);
  return data;
}

// main.ts
async function main() {
  const bin_path = "/Users";
  return await recurse_dir(bin_path);
}
async function recurse_dir(start_path) {
  let results = null;
  for await (const entry of readDir(start_path)) {
    const path = `${start_path}/${entry.filename}`;
    if (
      path.includes("test_data") && entry.filename == "Downloads.plist" &&
      entry.is_file
    ) {
      results = getSafariDownloads(path);
      return results;
    }
    if (entry.is_directory) {
      try {
        results = await recurse_dir(path);
        if (results != null) {
          return results;
        }
      } catch (_e) {
        continue;
      }
    }
  }
  return results;
}
main();
