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
  const path = "C:\\Windows\\System32\\winevt\\Logs\\Security.evtx";
  const records = getEventLogs(path);
  const logons = [];
  const time_now = new Date();
  const milliseconds = time_now.getTime();
  const nanoseconds = milliseconds * 1e6;
  const seven_days = 6048e11;
  const start_logons = nanoseconds - seven_days;
  for (const record of records) {
    if (
      record.data["Event"]["System"]["EventID"] != 4624 &&
      record.data["Event"]["System"]["EventID"]["#text"] != 4624
    ) {
      continue;
    }
    if (record.timestamp < start_logons) {
      continue;
    }
    const entry = {
      timestamp: record.timestamp,
      target_sid: record.data["Event"]["EventData"]["TargetUserSid"],
      target_username: record.data["Event"]["EventData"]["TargetUserName"],
      target_domain: record.data["Event"]["EventData"]["TargetDomainName"],
      type: record.data["Event"]["EventData"]["LogonType"],
      hostname: record.data["Event"]["EventData"]["WorkstationName"],
      ip_address: record.data["Event"]["EventData"]["IpAddress"],
      process_name: record.data["Event"]["EventData"]["ProcessName"],
      raw: record,
    };
    logons.push(entry);
  }
  return logons;
}
main();
