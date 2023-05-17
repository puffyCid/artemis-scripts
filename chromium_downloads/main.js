// https://github.com/puffycid/artemis-api/src/applications/chromium.ts
function get_chromium_downloads(path) {
  const data = Deno[Deno.internal].core.ops.get_chromium_downloads(path);
  const downloads = JSON.parse(data);
  return downloads;
}

// https://github.com/puffycid/artemis-api/mod.ts
function getChromiumDownloads(path) {
  return get_chromium_downloads(path);
}

// main.ts
function main() {
  return recurse_dir("/Users");
}
function recurse_dir(start_path) {
  let results = null;
  for (const entry of Deno.readDirSync(start_path)) {
    const path = `${start_path}/${entry.name}`;
    if (path.includes("test_data") && entry.name == "History" && entry.isFile) {
      results = getChromiumDownloads(path);
      return results;
    }
    if (entry.isDirectory) {
      try {
        results = recurse_dir(path);
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
