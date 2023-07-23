// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/unifiedlogs.ts
function getUnifiedLog(path) {
  const data = Deno.core.ops.get_unified_log(path);
  const log_data = JSON.parse(data);
  return log_data;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/directory.ts
function readDir(path) {
  const data = fs.readDir(path);
  return data;
}

// main.ts
async function main() {
  const path = "/var/db/diagnostics/Persist";
  const xprotect_entries = [];
  for await (const entry of readDir(path)) {
    if (!entry.is_file) {
      continue;
    }
    const persist_file = entry.filename;
    const persist_full_path = `${path}/${persist_file}`;
    const logs = getUnifiedLog(persist_full_path);
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
