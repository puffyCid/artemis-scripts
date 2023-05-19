import { getEventLogs } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { EventLogRecord } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/eventlogs.ts";

interface Logon {
  timestamp: number;
  target_sid: string;
  target_username: string;
  target_domain: string;
  type: number;
  hostname: string;
  ip_address: string;
  process_name: string;
  raw: EventLogRecord;
}

/**
 * Simple script to pull all Windows from the past **seven (7)** days.
 * Currently we do not link the logon with a logoff, but that could be easily added
 * @returns Array of logons
 */
function main() {
  const path = "C:\\Windows\\System32\\winevt\\Logs\\Security.evtx";
  const records = getEventLogs(path);

  const logons: Logon[] = [];
  const time_now = new Date();
  // Get current time
  const milliseconds = time_now.getTime();
  const nanoseconds = milliseconds * 1000000;
  const seven_days = 604800000000000;

  // Earliest timestamp we want
  const start_logons = nanoseconds - seven_days;
  for (const record of records) {
    // Currently only getting logons. May add logoffs later
    if (
      record.data[ "Event" ][ "System" ][ "EventID" ] != 4624 &&
      record.data[ "Event" ][ "System" ][ "EventID" ][ "#text" ] != 4624
    ) {
      continue;
    }

    // Only want logons in the past 7 days
    if (record.timestamp < start_logons) {
      continue;
    }

    const entry: Logon = {
      timestamp: record.timestamp,
      target_sid: record.data[ "Event" ][ "EventData" ][ "TargetUserSid" ],
      target_username: record.data[ "Event" ][ "EventData" ][ "TargetUserName" ],
      target_domain: record.data[ "Event" ][ "EventData" ][ "TargetDomainName" ],
      type: record.data[ "Event" ][ "EventData" ][ "LogonType" ],
      hostname: record.data[ "Event" ][ "EventData" ][ "WorkstationName" ],
      ip_address: record.data[ "Event" ][ "EventData" ][ "IpAddress" ],
      process_name: record.data[ "Event" ][ "EventData" ][ "ProcessName" ],
      raw: record,
    };

    logons.push(entry);
  }
  return logons;
}
main();
