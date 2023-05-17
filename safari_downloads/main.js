// https://github.com/puffycid/artemis-api/src/applications/safari.ts
function get_safari_downloads(path) {
  const data = Deno[Deno.internal].core.ops.get_safari_downloads(path);
  const downloads = JSON.parse(data);
  return downloads;
}

// https://github.com/puffycid/artemis-api/mod.ts
function getSafariDownloads(path) {
  return get_safari_downloads(path);
}

// main.ts
function main() {
  const bin_path = "/Users";
  return recurse_dir(bin_path);
}
function recurse_dir(start_path) {
  let results = null;
  for (const entry of Deno.readDirSync(start_path)) {
    const path = `${start_path}/${entry.name}`;
    if (
      path.includes("test_data") && entry.name == "Downloads.plist" &&
      entry.isFile
    ) {
      results = getSafariDownloads(path);
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
