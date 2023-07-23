// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/eventlogs.ts
function get_eventlogs(path) {
  const data = Deno.core.ops.get_eventlogs(path);
  const log_array = JSON.parse(data);
  return log_array;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/prefetch.ts
function get_prefetch_path(path) {
  const data = Deno.core.ops.get_prefetch_path(path);
  const pf = JSON.parse(data);
  return pf;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/registry.ts
function get_registry(path) {
  const data = Deno.core.ops.get_registry(path);
  const reg_array = JSON.parse(data);
  return reg_array;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/shortcuts.ts
function get_lnk_file(path) {
  const data = Deno.core.ops.get_lnk_file(path);
  const lnk = JSON.parse(data);
  return lnk;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/srum.ts
function get_srum_application_info(path) {
  const name = "{D10CA2FE-6FCF-4F6D-848E-B2E99266FA89}";
  const data = Deno.core.ops.get_srum(path, name);
  const srum = JSON.parse(data);
  return srum;
}
function get_srum_application_timeline(path) {
  const name = "{5C8CF1C7-7257-4F13-B223-970EF5939312}";
  const data = Deno.core.ops.get_srum(path, name);
  const srum = JSON.parse(data);
  return srum;
}
function get_srum_application_vfu(path) {
  const name = "{7ACBBAA3-D029-4BE4-9A7A-0885927F1D8F}";
  const data = Deno.core.ops.get_srum(path, name);
  const srum = JSON.parse(data);
  return srum;
}
function get_srum_energy_info(path) {
  const name = "{DA73FB89-2BEA-4DDC-86B8-6E048C6DA477}";
  const data = Deno.core.ops.get_srum(path, name);
  const srum = JSON.parse(data);
  return srum;
}
function get_srum_energy_usage(path) {
  let name = "{FEE4E14F-02A9-4550-B5CE-5FA2DA202E37}";
  let data = Deno.core.ops.get_srum(path, name);
  const srum = JSON.parse(data);
  name = "{FEE4E14F-02A9-4550-B5CE-5FA2DA202E37}LT";
  data = Deno.core.ops.get_srum(path, name);
  const srum_all = srum.concat(JSON.parse(data));
  return srum_all;
}
function get_srum_network_info(path) {
  const name = "{973F5D5C-1D90-4944-BE8E-24B94231A174}";
  const data = Deno.core.ops.get_srum(path, name);
  const srum = JSON.parse(data);
  return srum;
}
function get_srum_network_connectivity(path) {
  const name = "{DD6636C4-8929-4683-974E-22C046A43763}";
  const data = Deno.core.ops.get_srum(path, name);
  const srum = JSON.parse(data);
  return srum;
}
function get_srum_notifications(path) {
  const name = "{D10CA2FE-6FCF-4F6D-848E-B2E99266FA86}";
  const data = Deno.core.ops.get_srum(path, name);
  const srum = JSON.parse(data);
  return srum;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getLnkFile(path) {
  return get_lnk_file(path);
}
function getEventLogs(path) {
  return get_eventlogs(path);
}
function getRegistry(path) {
  return get_registry(path);
}
function getPrefetchPath(path) {
  return get_prefetch_path(path);
}
function getSrumApplicationInfo(path) {
  return get_srum_application_info(path);
}
function getSrumApplicationTimeline(path) {
  return get_srum_application_timeline(path);
}
function getSrumApplicationVFU(path) {
  return get_srum_application_vfu(path);
}
function getSrumEnergyInfo(path) {
  return get_srum_energy_info(path);
}
function getSrumEnergyUsage(path) {
  return get_srum_energy_usage(path);
}
function getSrumNetworkInfo(path) {
  return get_srum_network_info(path);
}
function getSrumConnectivity(path) {
  return get_srum_network_connectivity(path);
}
function getSrumNotifications(path) {
  return get_srum_notifications(path);
}

// main.ts
const start_path = "C:\\DFIRArtifactMuseum";
function main() {
  const amcaches = bulkAmcacheTests();
  const shortcuts = bulkShortcuts();
  const prefetchs = bulkPrefetch();
  const logs = bulkEventlogs();
  const srums = bulkSRUM();
  const registrys = bulkRegistry();
  const results = {
    amcaches,
    shortcuts,
    prefetchs,
    logs,
    srums,
    registrys,
  };
  return results;
}
function bulkAmcacheTests() {
  const amcaches = [];
  const paths = [
    `${start_path}\\Windows\\Amcache\\Win10\\APTSimulatorVM\\Amcache.hve`,
    `${start_path}\\Windows\\Amcache\\Win10\\RathbunVM\\Amcache.hve`,
    `${start_path}\\Windows\\Amcache\\Win11\\RathbunVM\\Amcache.hve`,
    `${start_path}\\Windows\\Amcache\\Win2012R2\\StolenSzechuan\\Amcache.hve`,
  ];
  for (const entry of paths) {
    console.log(`Parsing Amcache ${entry}`);
    const result = getRegistry(entry);
    amcaches.push(result);
  }
  return amcaches;
}
function bulkShortcuts() {
  const shortcuts = [];
  const paths = [
    `${start_path}\\Windows\\LNK\\Win7`,
    `${start_path}\\Windows\\LNK\\Win8.0`,
    `${start_path}\\Windows\\LNK\\Win8.1`,
    `${start_path}\\Windows\\LNK\\Win10`,
    `${start_path}\\Windows\\LNK\\Win11\\RathbunVM`,
    `${start_path}\\Windows\\LNK\\Win2012`,
    `${start_path}\\Windows\\LNK\\Win2012R2\\StolenSzechuan`,
    `${start_path}\\Windows\\LNK\\Win2012R2\\EricZimmerman`,
  ];
  for (const entry of paths) {
    for (const file of readDir(entry)) {
      const lnk_file = `${entry}\\${file.filename}`;
      console.log(`Parsing Shortcut ${lnk_file}`);
      const result = getLnkFile(lnk_file);
      shortcuts.push(result);
    }
  }
  return shortcuts;
}
function bulkPrefetch() {
  const prefetchs = [];
  const paths = [
    `${start_path}\\Windows\\Prefetch\\Win7\\RathbunVM`,
    `${start_path}\\Windows\\Prefetch\\Win8\\RathbunVM`,
    `${start_path}\\Windows\\Prefetch\\Win7SP1\\RathbunVM`,
    `${start_path}\\Windows\\Prefetch\\Win10\\APTSimulatorVM`,
    `${start_path}\\Windows\\Prefetch\\Win10\\BelkasoftCTF_InsiderThreat`,
    `${start_path}\\Windows\\Prefetch\\Win10\\RathbunVM`,
    `${start_path}\\Windows\\Prefetch\\Win11\\RathbunVM\\Compressed`,
    `${start_path}\\Windows\\Prefetch\\Win81NoUpdate\\RathbunVM`,
    `${start_path}\\Windows\\Prefetch\\Win81Update\\RathbunVM`,
  ];
  for (const entry of paths) {
    console.log(`Parsing Prefetch directory ${entry}`);
    const result = getPrefetchPath(entry);
    prefetchs.push(result);
  }
  return prefetchs;
}
function bulkEventlogs() {
  const logs = [];
  const paths = [
    `${start_path}\\Windows\\EventLogs\\Win10\\RathbunVM`,
    `${start_path}\\Windows\\EventLogs\\Win10\\APTSimulatorVM`,
    `${start_path}\\Windows\\EventLogs\\Win10\\BelkasoftCTF_InsiderThreat`,
    `${start_path}\\Windows\\EventLogs\\Win10\\APTSimulatorVM`,
    `${start_path}\\Windows\\EventLogs\\Win10\\BelkasoftCTF_InsiderThreat`,
    `${start_path}\\Windows\\EventLogs\\Win2012R2\\StolenSzechuan`,
    `${start_path}\\Windows\\EventLogs\\Win11\\RathbunVM`,
  ];
  for (const entry of paths) {
    for (const file of readDir(entry)) {
      if (!file.name.includes("evtx")) {
        continue;
      }
      const log_file = `${entry}\\${file.filename}`;
      console.log(`Parsing EventLogs directory ${log_file}`);
      const result = getEventLogs(log_file);
      logs.push(result);
    }
  }
  return logs;
}
function bulkSRUM() {
  const srums = {
    appinfo: [],
    timeline: [],
    netinfo: [],
    connect: [],
    notifs: [],
    energy: [],
    energyinfo: [],
    vfu: [],
  };
  const paths = [
    `${start_path}\\Windows\\SRUM\\Win10\\RathbunVM\\Clean\\SRUDB.dat`,
    `${start_path}\\Windows\\SRUM\\Win10\\RathbunVM\\Dirty\\SRUDB.dat`,
    `${start_path}\\Windows\\SRUM\\Win10\\APTSimulatorVM\\Clean\\SRUDB.dat`,
    `${start_path}\\Windows\\SRUM\\Win10\\BelkasoftCTF_InsiderThreat\\Clean\\SRUDB.dat`,
    `${start_path}\\Windows\\SRUM\\Win10\\BelkasoftCTF_InsiderThreat\\Dirty\\SRUDB.dat`,
    `${start_path}\\Windows\\SRUM\\Win11\\RathbunVM\\Clean\\SRUDB.dat`,
    `${start_path}\\Windows\\SRUM\\Win11\\RathbunVM\\Dirty\\SRUDB.dat`,
  ];
  for (const entry of paths) {
    console.log(`Parsing SRUM ${entry}`);
    srums.appinfo.push(getSrumApplicationInfo(entry));
    srums.connect.push(getSrumConnectivity(entry));
    srums.energy.push(getSrumEnergyUsage(entry));
    srums.energyinfo.push(getSrumEnergyInfo(entry));
    srums.notifs.push(getSrumNotifications(entry));
    srums.netinfo.push(getSrumNetworkInfo(entry));
    srums.vfu.push(getSrumApplicationVFU(entry));
    srums.timeline.push(getSrumApplicationTimeline(entry));
  }
  return srums;
}
function bulkRegistry() {
  const regs = [];
  const paths = [
    `${start_path}\\Windows\\Registry\\Win10\\APTSimulatorVM\\SAM`,
    `${start_path}\\Windows\\Registry\\Win10\\APTSimulatorVM\\SOFTWARE`,
    `${start_path}\\Windows\\Registry\\Win10\\APTSimulatorVM\\SYSTEM`,
    `${start_path}\\Windows\\Registry\\Win10\\APTSimulatorVM\\SECURITY`,
    `${start_path}\\Windows\\Registry\\Win10\\APTSimulatorVM\\DEFAULT`,
    `${start_path}\\Windows\\Registry\\Win10\\APTSimulatorVM\\TestUser\\NTUSER.DAT`,
    `${start_path}\\Windows\\Registry\\Win10\\APTSimulatorVM\\TestUser\\UsrClass.dat`,
    `${start_path}\\Windows\\Registry\\Win10\\BelkasoftCTF_InsiderThreat\\SAM`,
    `${start_path}\\Windows\\Registry\\Win10\\BelkasoftCTF_InsiderThreat\\SOFTWARE`,
    `${start_path}\\Windows\\Registry\\Win10\\BelkasoftCTF_InsiderThreat\\SYSTEM`,
    `${start_path}\\Windows\\Registry\\Win10\\BelkasoftCTF_InsiderThreat\\SECURITY`,
    `${start_path}\\Windows\\Registry\\Win10\\BelkasoftCTF_InsiderThreat\\DEFAULT`,
    `${start_path}\\Windows\\Registry\\Win10\\RathbunVM\\SAM`,
    `${start_path}\\Windows\\Registry\\Win10\\RathbunVM\\SOFTWARE`,
    `${start_path}\\Windows\\Registry\\Win10\\RathbunVM\\SYSTEM`,
    `${start_path}\\Windows\\Registry\\Win10\\RathbunVM\\SECURITY`,
    `${start_path}\\Windows\\Registry\\Win10\\RathbunVM\\DEFAULT`,
    `${start_path}\\Windows\\Registry\\Win10\\RathbunVM\\COMPONENTS`,
    `${start_path}\\Windows\\Registry\\Win10\\RathbunVM\\BBI`,
    `${start_path}\\Windows\\Registry\\Win10\\RathbunVM\\ELAM`,
    `${start_path}\\Windows\\Registry\\Win10\\RathbunVM\\BCD-Template`,
    `${start_path}\\Windows\\Registry\\Win10\\RathbunVM\\NTUSER.DAT`,
    `${start_path}\\Windows\\Registry\\Win10\\RathbunVM\\UsrClass.dat`,
    `${start_path}\\Windows\\Registry\\Win10\\RathbunVM\\DRIVERS`,
    `${start_path}\\Windows\\Registry\\Win10\\RathbunVM\\DEFAULT (NTUSER)\\NTUSER.DAT`,
    `${start_path}\\Windows\\Registry\\Win10\\RathbunVM\\LocalService\\NTUSER.DAT`,
    `${start_path}\\Windows\\Registry\\Win10\\RathbunVM\\NetworkService\\NTUSER.DAT`,
    `${start_path}\\Windows\\Registry\\Win2012R2\\StolenSzechuan\\SAM`,
    `${start_path}\\Windows\\Registry\\Win2012R2\\StolenSzechuan\\SYSTEM`,
    `${start_path}\\Windows\\Registry\\Win2012R2\\StolenSzechuan\\SOFTWARE`,
    `${start_path}\\Windows\\Registry\\Win2012R2\\StolenSzechuan\\SECURITY`,
    `${start_path}\\Windows\\Registry\\Win2012R2\\StolenSzechuan\\BBI`,
    `${start_path}\\Windows\\Registry\\Win2012R2\\StolenSzechuan\\DEFAULT`,
    `${start_path}\\Windows\\Registry\\Win2012R2\\StolenSzechuan\\DRIVERS`,
  ];
  for (const entry of paths) {
    console.log(`Parsing Registry file ${entry}`);
    const result = getRegistry(entry);
    regs.push(result);
  }
  const zim_paths = [
    `${start_path}\\Windows\\Registry\\Win7\\EricZimmerman`,
  ];
  for (const entry of zim_paths) {
    for (const file of readDir(entry)) {
      const reg_file = `${entry}\\${file.filename}`;
      console.log(`Parsing Zimmerman Reg file ${reg_file}`);
      try {
        const result = getRegistry(reg_file);
        regs.push(result);
      } catch (e) {
        console.error(`Failed to parse ${reg_file} error: ${e}`);
      }
    }
  }
  return regs;
}
main();
