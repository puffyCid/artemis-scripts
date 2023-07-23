import { getEventLogs } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { getEnvValue } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/environment/mod.ts";
import { Bits } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/bits.ts";
import { EventLogRecord } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/eventlogs.ts";
import {
  Registry,
  RegistryData,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/registry.ts";

/**
 * Function to filter service event log records (EID 7045) looking for 16 character service names or sus service execution commands
 * @returns Service install event log entries with sus associated commands or 16 character name
 */
function grabEventLogs(): EventLogRecord[] {
  const drive = getEnvValue("SystemDrive");
  if (drive === "") {
    return [];
  }

  const data = getEventLogs(
    `${drive}\\Windows\\System32\\winevt\\Logs\\System.evtx`,
  );
  const service_installs: EventLogRecord[] = [];
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
      sus_services.some((value) =>
        record.data["Event"]["EventData"]["ImagePath"]
          .toLowerCase()
          .includes(value)
      )
    ) {
      service_installs.push(record);
    }
  }
  return service_installs;
}

/**
 * Function to filter `RegistryData` to look for sus persistence at Run and RunOnce keys
 * @param data serailized JSON string representing `RegistryData`
 * @returns Filtered `RegistryData` related to Run or RunOnce keys with sus values
 */
function filterRegistry(data: string): RegistryData {
  const regs: RegistryData = JSON.parse(data);

  const sus_run_keys = ["cmd.exe", "powershell", "temp", "appdata", "script"];
  const sus_hit: RegistryData = {
    registry_file: regs.registry_file,
    registry_path: regs.registry_path,
    registry_entries: [],
  };
  for (const record of regs.registry_entries) {
    if (record.name === "Run" || record.name === "RunOnce") {
      const reg_hit: Registry = {
        key: record.key,
        name: record.name,
        path: record.path,
        values: [],
        last_modified: record.last_modified,
        depth: record.depth,
      };
      for (const value of record.values) {
        if (
          sus_run_keys.some((reg_value) =>
            value.data.toLowerCase().includes(reg_value)
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

/**
 * Function to try to look for non-builtin or common BITS jobs
 * @param data serialized JSON string representing `Bits` data
 * @returns Filtereted `Bits` containing non-builtin BITS jobs
 */
function filterBits(data: string): Bits {
  const bits_data: Bits = JSON.parse(data);
  const sus_bits: Bits = {
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
      !standard_bits.some((value) =>
        bit.full_path.toLowerCase().includes(value)
      ) &&
      !standard_bits.some((value) => bit.url.toLowerCase().includes(value))
    ) {
      sus_bits.bits.push(bit);
    }
  }

  for (const bit of bits_data.carved_files) {
    if (
      !standard_bits.some((value) =>
        bit.full_path.toLowerCase().includes(value)
      ) &&
      !standard_bits.some((value) => bit.url.toLowerCase().includes(value))
    ) {
      sus_bits.carved_files.push(bit);
    }
  }

  for (const bit of bits_data.carved_jobs) {
    if (
      !standard_bits.some((value) =>
        bit.target_path.toLowerCase().includes(value)
      )
    ) {
      sus_bits.carved_jobs.push(bit);
    }
  }

  return sus_bits;
}

/**
 * Script that is both a regular artemis script and a filter script
 * @returns Anything
 */
function main() {
  const args = STATIC_ARGS;

  // If we received no filtered data (args.length === 0)
  // Then we wil run as a regular script
  if (args.length < 2) {
    return grabEventLogs();
  }

  if (args[1] === "registry") {
    return filterRegistry(args[0]);
  }

  if (args[1] === "bits") {
    return filterBits(args[0]);
  }

  // We received unknown type of data, returning back unfiltered
  return JSON.parse(args[0]);
}

main();
