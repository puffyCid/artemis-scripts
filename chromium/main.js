// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/applications/chromium.ts
function getChromiumHistory(path) {
  const data = Deno.core.ops.get_chromium_history(path);
  const history = JSON.parse(data);
  return history;
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
      path.includes("test_data") && entry.filename == "History" && entry.is_file
    ) {
      results = getChromiumHistory(path);
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
