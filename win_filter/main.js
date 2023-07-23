// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/eventlogs.ts
function get_eventlogs(path) {
  const data = Deno.core.ops.get_eventlogs(path);
  const log_array = JSON.parse(data);
  return log_array;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getEventLogs(path) {
  return get_eventlogs(path);
}

// main.ts
function grabEventLogs() {
  const drive = getEnvValue("SystemDrive");
  if (drive === void 0) {
    return [];
  }
  const data = getEventLogs(
    `${drive}\\Windows\\System32\\winevt\\Logs\\System.evtx`,
  );
  const service_installs = [];
  const sus_services = [".bat", "powershell", "cmd.exe", "COMSPEC"];
  for (const record of data) {
    if (
      record.data["Event"]["System"]["EventID"] != 7045 &&
      record.data["Event"]["System"]["EventID"]["#text"] != 7045
    ) {
      continue;
    }
    if (
      record.data["Event"]["EventData"]["ServiceName"].length === 16 ||
      sus_services.some(
        (value) =>
          record.data["Event"]["EventData"]["ImagePath"].toLowerCase().includes(
            value,
          ),
      )
    ) {
      service_installs.push(record);
    }
  }
  return service_installs;
}
function filterRegistry(data) {
  const regs = JSON.parse(data);
  const sus_run_keys = ["cmd.exe", "powershell", "temp", "appdata", "script"];
  const sus_hit = {
    registry_file: regs.registry_file,
    registry_path: regs.registry_path,
    registry_entries: [],
  };
  for (const record of regs.registry_entries) {
    if (record.name === "Run" || record.name === "RunOnce") {
      const reg_hit = {
        key: record.key,
        name: record.name,
        path: record.path,
        values: [],
        last_modified: record.last_modified,
        depth: record.depth,
      };
      for (const value of record.values) {
        if (
          sus_run_keys.some(
            (reg_value) => value.data.toLowerCase().includes(reg_value),
          )
        ) {
          reg_hit.values.push(value);
        }
      }
      if (reg_hit.values.length === 0) {
        continue;
      }
      sus_hit.registry_entries.push(reg_hit);
    }
  }
  return sus_hit;
}
function filterBits(data) {
  const bits_data = JSON.parse(data);
  const sus_bits = {
    bits: [],
    carved_files: [],
    carved_jobs: [],
  };
  const standard_bits = [
    "mozilla",
    "outlook",
    "edge",
    "onedrive",
    "google",
    "speech",
  ];
  for (const bit of bits_data.bits) {
    if (
      !standard_bits.some(
        (value) => bit.full_path.toLowerCase().includes(value),
      ) && !standard_bits.some((value) => bit.url.toLowerCase().includes(value))
    ) {
      sus_bits.bits.push(bit);
    }
  }
  for (const bit of bits_data.carved_files) {
    if (
      !standard_bits.some(
        (value) => bit.full_path.toLowerCase().includes(value),
      ) && !standard_bits.some((value) => bit.url.toLowerCase().includes(value))
    ) {
      sus_bits.carved_files.push(bit);
    }
  }
  for (const bit of bits_data.carved_jobs) {
    if (
      !standard_bits.some(
        (value) => bit.target_path.toLowerCase().includes(value),
      )
    ) {
      sus_bits.carved_jobs.push(bit);
    }
  }
  return sus_bits;
}
function main() {
  const args = STATIC_ARGS;
  if (args.length < 2) {
    return grabEventLogs();
  }
  if (args[1] === "registry") {
    return filterRegistry(args[0]);
  }
  if (args[1] === "bits") {
    return filterBits(args[0]);
  }
  return JSON.parse(args[0]);
}
main();
