// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/search.ts
function get_search(path) {
  const data = Deno.core.ops.get_search(path);
  const search = JSON.parse(data);
  return search;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getSearch(path) {
  return get_search(path);
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/environment/env.ts
function getEnvValue(key) {
  const data = env.environmentValue(key);
  return data;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/files.ts
function stat(path) {
  const data = fs.stat(path);
  return data;
}

// main.ts
function main() {
  const drive = getEnvValue("SystemDrive");
  if (drive === "") {
    return [];
  }
  const path =
    `${drive}\\ProgramData\\Microsoft\\Search\\Data\\Applications\\Windows`;
  try {
    const search_path = `${path}\\Windows.edb`;
    const status = stat(search_path);
    if (!status.is_file) {
      return [];
    }
    const results = getSearch(search_path);
    return results;
  } catch (_e) {
    const search_path = `${path}\\Windows.db`;
    const status = stat(search_path);
    if (!status.is_file) {
      return [];
    }
    const results = getSearch(search_path);
    return results;
  }
}
main();
