// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/search.ts
function get_search(path) {
  const data = Deno[Deno.internal].core.ops.get_search(path);
  const srum = JSON.parse(data);
  return srum;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getSearch(path) {
  return get_search(path);
}

// main.ts
function main() {
  const drive = Deno.env.get("SystemDrive");
  if (drive === void 0) {
    return [];
  }
  const path =
    `${drive}\\ProgramData\\Microsoft\\Search\\Data\\Applications\\Windows`;
  try {
    const search_path = `${path}\\Windows.edb`;
    const status = Deno.lstatSync(search_path);
    if (!status.isFile) {
      return [];
    }
    const results = getSearch(search_path);
    return results;
  } catch (_e) {
    const search_path = `${path}\\Windows.db`;
    const status = Deno.lstatSync(search_path);
    if (!status.isFile) {
      return [];
    }
    const results = getSearch(search_path);
    return results;
  }
}
main();
