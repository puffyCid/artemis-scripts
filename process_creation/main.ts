import { getEventlogs } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { EventLogRecord } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/types/windows/eventlogs.d.ts";

function main() {
  const path = "C:\\Windows\\System32\\winevt\\Logs\\Security.evtx";
  const records = getEventlogs(path);

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
