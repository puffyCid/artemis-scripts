// https://github.com/puffycid/artemis-api/src/applications/chromium.ts
function get_chromium_history(path) {
  const data = Deno[Deno.internal].core.ops.get_chromium_history(path);
  const history = JSON.parse(data);
  return history;
}

// https://github.com/puffycid/artemis-api/mod.ts
function getChromiumHistory(path) {
  return get_chromium_history(path);
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
      results = getChromiumHistory(path);
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
