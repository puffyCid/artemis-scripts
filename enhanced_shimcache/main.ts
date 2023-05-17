import { getShimcache } from "https://github.com/puffycid/artemis-api/mod.ts";
import { Shimcache } from "https://github.com/puffycid/artemis-api/src/windows/shimcache.ts";

import {
  crypto,
  toHashString,
} from "https://deno.land/std@0.173.0/crypto/mod.ts";

interface EnhancedShimcache extends Shimcache {
  md5: string;
  created: number;
  modified: number;
  accessed: number | undefined;
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
      const info = Deno.statSync(entry.path);
      const data = Deno.readFileSync(entry.path);
      const hash = crypto.subtle.digestSync("MD5", data);

      if (info.mtime === null || info.birthtime === null) {
        const shim = create_entry(entry);
        shim_array.push(shim);
        continue;
      }

      const shim: EnhancedShimcache = {
        md5: toHashString(hash),
        created: info.birthtime.getTime(),
        modified: info.mtime.getTime(),
        accessed: info.atime?.getTime(),
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
