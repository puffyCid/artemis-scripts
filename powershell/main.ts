import { getEventLogs } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { EventLogRecord } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/eventlogs.ts";

interface PowerShellLogs {
  scriptblocks: Blocks[];
  powershell: PowerShell[];
}

interface PowerShell {
  timestamp: number;
  data: string[];
  raw: EventLogRecord;
}

interface Blocks {
  path: string;
  text: string;
  timestamp: number;
  id: string;
  raw: EventLogRecord;
}

/**
 * Simple script to pull all Windows PowerShell logs.
 * Currently we do not re-assemble ScriptBlocks. But that could be added
 * @returns Array of logons
 */
function main() {
  const paths = [
    "C:\\Windows\\System32\\winevt\\Logs\\Windows PowerShell.evtx",
    "C:\\Windows\\System32\\winevt\\Logs\\Microsoft-Windows-PowerShell%4Operational.evtx",
  ];
  const blocks: Blocks[] = [];
  const power: PowerShell[] = [];
  // There are probably more EIDs we could grab
  const eids = [ 400, 800, 4104, 4103 ];

  for (const path of paths) {
    const records = getEventLogs(path);

    for (const record of records) {
      if (
        !eids.includes(record.data[ "Event" ][ "System" ][ "EventID" ]) &&
        !eids.includes(record.data[ "Event" ][ "System" ][ "EventID" ][ "#text" ])
      ) {
        continue;
      }

      if (path.includes("Windows PowerShell.evtx")) {
        const powershell: PowerShell = {
          timestamp: record.timestamp,
          data: record.data[ "Event" ][ "EventData" ][ "Data" ][ "#text" ],
          raw: record,
        };
        power.push(powershell);
      } else {
        const block: Blocks = {
          timestamp: record.timestamp,
          path: record.data[ "Event" ][ "EventData" ][ "Path" ],
          text: record.data[ "Event" ][ "EventData" ][ "ScriptBlockText" ],
          id: record.data[ "Event" ][ "EventData" ][ "ScriptBlockId" ],
          raw: record,
        };
        blocks.push(block);
      }
    }
  }
  const logs: PowerShellLogs = {
    scriptblocks: blocks,
    powershell: power,
  };

  return logs;
}

main();
