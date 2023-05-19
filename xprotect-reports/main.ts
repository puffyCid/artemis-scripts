import { getUnifiedLog } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { UnifiedLogEntries } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/unifiedlogs.ts";

/**
 * @returns List of Unified Log entries related to XProtect messages
 */
function main() {
  // Path Persist log (trace files)
  const path = "/var/db/diagnostics/Persist";
  const xprotect_entries: UnifiedLogEntries[] = [];
  for (const entry of Deno.readDirSync(path)) {
    if (!entry.isFile) {
      continue;
    }
    const persist_file = entry.name;
    const persist_full_path = `${path}/${persist_file}`;

    const logs = getUnifiedLog(persist_full_path);
    // Only get logs that are related to Apples XProtect software
    for (const log_entry of logs) {
      if (!log_entry.message.toLowerCase().includes("xprotect")) {
        continue;
      }
      xprotect_entries.push(log_entry);
    }
  }

  return xprotect_entries;
}

main();
