import { getUnifiedLog } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { UnifiedLog } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/unifiedlogs.ts";
import { readDir } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";

/**
 * @returns List of Unified Log entries related to XProtect messages
 */
async function main() {
  // Path Persist log (trace files)
  const path = "/var/db/diagnostics/Persist";
  const xprotect_entries: UnifiedLog[] = [];
  for (const entry of await readDir(path)) {
    if (!entry.is_file) {
      continue;
    }
    const persist_file = entry.filename;
    const persist_full_path = `${path}/${persist_file}`;

    const logs = getUnifiedLog(persist_full_path);
    // Only get logs that are related to Apples XProtect software
    for (let log_entry = 0; log_entry < logs.length; log_entry++) {
      if (!logs[log_entry].message.toLowerCase().includes("xprotect")) {
        continue;
      }
      xprotect_entries.push(logs[log_entry]);
    }
  }

  return xprotect_entries;
}

main();
