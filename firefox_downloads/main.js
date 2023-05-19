// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/applications/firefox.ts
function get_firefox_downloads(path) {
  const data = Deno[Deno.internal].core.ops.get_firefox_downloads(path);
  const downloads = JSON.parse(data);
  return downloads;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getFirefoxDownloads(path) {
  return get_firefox_downloads(path);
}

// main.ts
function main() {
  return recurse_dir("/Users");
}
function recurse_dir(start_path) {
  let results = null;
  for (const entry of Deno.readDirSync(start_path)) {
    const path = `${start_path}/${entry.name}`;
    if (
      path.includes("test_data") && entry.name == "places_downloads.sqlite" &&
      entry.isFile
    ) {
      results = getFirefoxDownloads(path);
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
