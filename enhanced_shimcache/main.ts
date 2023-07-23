import { getShimcache } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { Shimcache } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/shimcache.ts";
import { stat } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";
import { hash } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/files.ts";
interface EnhancedShimcache extends Shimcache {
  md5: string;
  created: number;
  modified: number;
  accessed: number;
  size: number;
}

function create_entry(entry: Shimcache): EnhancedShimcache {
  const shim: EnhancedShimcache = {
    md5: "",
    created: 0,
    modified: 0,
    accessed: 0,
    size: 0,
    entry: entry.entry,
    path: entry.path,
    last_modified: entry.last_modified,
    key_path: entry.key_path,
  };
  return shim;
}

function main() {
  const shimcache_entries = getShimcache();
  const shim_array: EnhancedShimcache[] = [];

  for (const entry of shimcache_entries) {
    try {
      const info = stat(entry.path);

      if (info.modified === null || info.created === null) {
        const shim = create_entry(entry);
        shim_array.push(shim);
        continue;
      }

      const shim: EnhancedShimcache = {
        md5: hash(entry.path, true, false, false).md5,
        created: info.created,
        modified: info.modified,
        accessed: info.accessed,
        size: info.size,
        entry: entry.entry,
        path: entry.path,
        last_modified: entry.last_modified,
        key_path: entry.key_path,
      };
      shim_array.push(shim);
    } catch (_error) {
      const shim = create_entry(entry);
      shim_array.push(shim);
      continue;
    }
  }
  return shim_array;
}

main();
