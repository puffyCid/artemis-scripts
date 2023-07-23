// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/applications/firefox.ts
function getFirefoxDownloads(path) {
  const data = Deno.core.ops.get_firefox_downloads(path);
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
  return await recurse_dir("/Users");
}
async function recurse_dir(start_path) {
  let results = null;
  for await (const entry of readDir(start_path)) {
    const path = `${start_path}/${entry.filename}`;
    if (
      path.includes("test_data") &&
      entry.filename == "places_downloads.sqlite" && entry.is_file
    ) {
      results = getFirefoxDownloads(path);
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
