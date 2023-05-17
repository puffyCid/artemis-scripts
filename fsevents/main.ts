import { getFsEvents } from "https://github.com/puffycid/artemis-api/mod.ts";
import { Fsevents } from "https://github.com/puffycid/artemis-api/src/macos/fsevents.ts";

/**
 * Parse FsEvents requries root permissions
 * @returns Array of FsEvent records that include "rs"
 */
function main() {
  const data = getFsEvents();
  const rs_data: Fsevents[] = [];

  for (const entry of data) {
    if (entry.path.includes("rs")) {
      rs_data.push(entry);
    }
  }
  return rs_data;
}

main();
