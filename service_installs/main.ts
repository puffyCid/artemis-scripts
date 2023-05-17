import { getEventLogs } from "https://github.com/puffycid/artemis-api/mod.ts";
import { EventLogRecord } from "https://github.com/puffycid/artemis-api/src/windows/eventlogs.ts";

function main() {
  const path = "C:\\Windows\\System32\\winevt\\Logs\\System.evtx";
  const records = getEventLogs(path);

  const service_installs: EventLogRecord[] = [];
  for (const record of records) {
    if (
      record.data[ "Event" ][ "System" ][ "EventID" ] != 7045 &&
      record.data[ "Event" ][ "System" ][ "EventID" ][ "#text" ] != 7045
    ) {
      continue;
    }
    service_installs.push(record);
  }
  return service_installs;
}
main();
