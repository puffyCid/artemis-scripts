// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/eventlogs.ts
function get_eventlogs(path) {
  const data = Deno[Deno.internal].core.ops.get_eventlogs(path);
  const log_array = JSON.parse(data);
  return log_array;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getEventLogs(path) {
  return get_eventlogs(path);
}

// main.ts
function main() {
  const paths = [
    "C:\\Windows\\System32\\winevt\\Logs\\Windows PowerShell.evtx",
    "C:\\Windows\\System32\\winevt\\Logs\\Microsoft-Windows-PowerShell%4Operational.evtx",
  ];
  const blocks = [];
  const power = [];
  const eids = [400, 800, 4104, 4103];
  for (const path of paths) {
    const records = getEventLogs(path);
    for (const record of records) {
      if (
        !eids.includes(record.data["Event"]["System"]["EventID"]) &&
        !eids.includes(record.data["Event"]["System"]["EventID"]["#text"])
      ) {
        continue;
      }
      if (path.includes("Windows PowerShell.evtx")) {
        const powershell = {
          timestamp: record.timestamp,
          data: record.data["Event"]["EventData"]["Data"]["#text"],
          raw: record,
        };
        power.push(powershell);
      } else {
        const block = {
          timestamp: record.timestamp,
          path: record.data["Event"]["EventData"]["Path"],
          text: record.data["Event"]["EventData"]["ScriptBlockText"],
          id: record.data["Event"]["EventData"]["ScriptBlockId"],
          raw: record,
        };
        blocks.push(block);
      }
    }
  }
  const logs = {
    scriptblocks: blocks,
    powershell: power,
  };
  return logs;
}
main();
