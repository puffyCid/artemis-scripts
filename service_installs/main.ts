import { getEventlogs } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { EventLogRecord } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/types/windows/eventlogs.js";

function main() {
  const path = "C:\\Windows\\System32\\winevt\\Logs\\System.evtx";
  const records = getEventlogs(path);

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
