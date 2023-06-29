import { getEventLogs } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { EventLogRecord } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/eventlogs.ts";

function main() {
  const path = "C:\\Windows\\System32\\winevt\\Logs\\Security.evtx";
  const records = getEventLogs(path);

  const processes: EventLogRecord[] = [];
  for (const record of records) {
    if (record.data["Event"]["System"]["EventID"] != 4688) {
      continue;
    }
    processes.push(record);
  }
  return processes;
}
main();
