import { getEventLogs } from "https://github.com/puffycid/artemis-api/mod.ts";
import { EventLogRecord } from "https://github.com/puffycid/artemis-api/src/windows/eventlogs.ts";

function main() {
  const path = "C:\\Windows\\System32\\winevt\\Logs\\Security.evtx";
  const records = getEventLogs(path);

  const processes: EventLogRecord[] = [];
  for (const record of records) {
    if (record.data[ "Event" ][ "System" ][ "EventID" ] != 4688) {
      continue;
    }
    processes.push(record);
  }
  return processes;
}
main();
