// https://github.com/puffycid/artemis-api/src/windows/eventlogs.ts
function get_eventlogs(path) {
  const data = Deno[Deno.internal].core.ops.get_eventlogs(path);
  const log_array = JSON.parse(data);
  return log_array;
}

// https://github.com/puffycid/artemis-api/mod.ts
function getEventLogs(path) {
  return get_eventlogs(path);
}

// main.ts
function main() {
  const path = "C:\\Windows\\System32\\winevt\\Logs\\Security.evtx";
  const records = getEventLogs(path);
  const processes = [];
  for (const record of records) {
    if (record.data["Event"]["System"]["EventID"] != 4688) {
      continue;
    }
    processes.push(record);
  }
  return processes;
}
main();
