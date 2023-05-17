// https://deno.land/std@0.177.0/encoding/base64.ts
function decode(b64) {
  const binString = atob(b64);
  const size = binString.length;
  const bytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    bytes[i] = binString.charCodeAt(i);
  }
  return bytes;
}

// https://github.com/puffycid/artemis-api/src/windows/ntfs.ts
function read_ads_data(path, ads_name) {
  const data = Deno[Deno.internal].core.ops.read_ads_data(
    path,
    ads_name,
  );
  return decode(data);
}

// https://github.com/puffycid/artemis-api/mod.ts
function readAdsData(path, ads_name) {
  return read_ads_data(path, ads_name);
}

// main.ts
function main() {
  const drive = Deno.env.get("SystemDrive");
  if (drive === void 0) {
    return [];
  }
  const web_files = [];
  const users = `${drive}\\Users`;
  for (const entry of Deno.readDirSync(users)) {
    try {
      const path = `${users}\\${entry.name}\\Downloads`;
      for (const file_entry of Deno.readDirSync(path)) {
        try {
          if (!file_entry.isFile) {
            continue;
          }
          const full_path = `${path}\\${file_entry.name}`;
          const ads = "Zone.Identifier";
          const data = readAdsData(full_path, ads);
          if (data.length === 0) {
            continue;
          }
          const info = Deno.statSync(full_path);
          if (
            info.mtime === null || info.birthtime === null ||
            info.atime === null
          ) {
            continue;
          }
          const mark_info = new TextDecoder().decode(data);
          const web_file = {
            mark: mark_info,
            path: full_path,
            created: info.birthtime,
            modified: info.mtime,
            accessed: info.atime,
            size: info.size,
          };
          web_files.push(web_file);
        } catch (_error) {
          continue;
        }
      }
    } catch (_error) {
      continue;
    }
  }
  return web_files;
}
main();
