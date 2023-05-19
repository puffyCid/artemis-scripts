// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/applications/firefox.ts
function get_firefox_history(path) {
  const data = Deno[Deno.internal].core.ops.get_firefox_history(path);
  const history = JSON.parse(data);
  return history;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getFirefoxHistory(path) {
  return get_firefox_history(path);
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
    if (path.includes("test_data") && entry.name == "places.sqlite" && entry.isFile) {
      results = getFirefoxHistory(path);
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
