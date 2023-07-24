import {
  getEventlogs,
  getLnkFile,
  getPrefetchPath,
  getRegistry,
  getSrumApplicationInfo,
  getSrumApplicationTimeline,
  getSrumApplicationVfu,
  getSrumNetworkConnectivity,
  getSrumEnergyInfo,
  getSrumEnergyUsage,
  getSrumNetworkInfo,
  getSrumNotifications,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { readDir } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";
import { EventLogRecord } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/eventlogs.ts";
import { Prefetch } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/prefetch.ts";
import { Registry } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/registry.ts";
import { Shortcut } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/shortcuts.ts";
import {
  ApplicationInfo,
  ApplicationTimeline,
  AppVfu,
  EnergyInfo,
  EnergyUsage,
  NetworkConnectivityInfo,
  NetworkInfo,
  NotificationInfo,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/srum.ts";

const start_path = "C:\\DFIRArtifactMuseum";

interface DFIRTests {
  amcaches: Registry[][];
  shortcuts: Shortcut[];
  prefetchs: Prefetch[][];
  logs: EventLogRecord[][];
  srums: SRUMTables;
  registrys: Registry[][];
}

/**
 * A script to run against the DFIR Musuem repo to test `artemis` against multiple Windows artifacts
 * https://raw.githubusercontent.com/AndrewRathbun/DFIRArtifactMuseum
 *
 * The purpose of this script is to ensure `artemis` does not crash and to test against a wide variety of different Windows OS aritfacts
 *
 * Known minor issues:
 * See `bulkRegistry()`
 */
async function main() {
  const amcaches = bulkAmcacheTests();
  const shortcuts = await bulkShortcuts();
  const prefetchs = bulkPrefetch();
  const logs = await bulkEventlogs();
  const srums = bulkSRUM();
  const registrys = await bulkRegistry();
  const results: DFIRTests = {
    amcaches,
    shortcuts,
    prefetchs,
    logs,
    srums,
    registrys,
  };
  return results;
}

/**
 * Normally we would `getAmcache()` to `Amcache` data, but it does not accept custom paths because `Amcache` is located at static location.
 * Using `getRegistry()` is ok because `Amcache` is *mostly* just strings once the binary Registry format is parsed out
 * Regardless, we should **NOT** get any errors or warnings when parsing the `Amcache` Registry data below
 * @returns Array of Registry data related to Amcache
 */
function bulkAmcacheTests(): Registry[][] {
  const amcaches: Registry[][] = [];
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

/**
 * We should only get WARNINGS related FAT timestamps (which means the `Shellitems` in the shortcut data does not have a timestamp. Sometimes a timestamp may not exist even though it should.)
 * @returns List of parsed shortcuts
 */
async function bulkShortcuts(): Promise<Shortcut[]> {
  const shortcuts: Shortcut[] = [];
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
    for (const file of await readDir(entry)) {
      const lnk_file = `${entry}\\${file.filename}`;
      console.log(`Parsing Shortcut ${lnk_file}`);
      const result = getLnkFile(lnk_file);
      shortcuts.push(result);
    }
  }

  return shortcuts;
}

/**
 * Only `C:\DFIRArtifactMuseum\Windows\Prefetch\Win81NoUpdate\RathbunVM\SEARCHFILTERHOST.EXE-AA7A1FDD.pf` should have an error. It contains only zeros (0). probably corrupted.
 * Since we are providing a path to `artemis`, it will handle any bad files and just keep going to the next file
 * @returns Array of prefetch files for all directories
 */
function bulkPrefetch(): Prefetch[][] {
  const prefetchs: Prefetch[][] = [];
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

/**
 * The `evtx` crate returns lots warnings related to encountering integers when expecting boolean values. It coerces the integers to boolean
 * @returns Array of all event log entries for all evtx files
 */
async function bulkEventlogs(): Promise<EventLogRecord[][]> {
  const logs: EventLogRecord[][] = [];
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
    for (const file of await readDir(entry)) {
      if (!file.filename.includes("evtx")) {
        continue;
      }
      const log_file = `${entry}\\${file.filename}`;
      console.log(`Parsing EventLogs directory ${log_file}`);
      const result = getEventlogs(log_file);
      logs.push(result);
    }
  }

  return logs;
}

interface SRUMTables {
  appinfo: ApplicationInfo[][];
  timeline: ApplicationTimeline[][];
  netinfo: NetworkInfo[][];
  connect: NetworkConnectivityInfo[][];
  notifs: NotificationInfo[][];
  energy: EnergyUsage[][];
  energyinfo: EnergyInfo[][];
  vfu: AppVfu[][];
}

/**
 * Some of these SRUM files do not contain all the tables we try to parse. So `artemis` will throw warnings that the provided table cannot be found/parsed.
 *
 * Interestingly another generic ESE parser (`ESEDBViewer`) shows that the files `\\Windows\\SRUM\\Win11\\RathbunVM\\{Clean, Dirty}\\SRUDB.dat` have a duplicate table: `ApplicationTimeline ({5C8CF1C7-7257-4F13-B223-970EF5939312})` shows up twice
 * But one (1) of the tables is empty.
 * However, `artemis` and the native Windows parser (`esentutl.exe`) only show one (1) `{5C8CF1C7-7257-4F13-B223-970EF5939312}` table
 *
 * @returns Interface containing all tables from all SRUM files. Both clean and dirty files are parsed
 */
function bulkSRUM(): SRUMTables {
  const srums: SRUMTables = {
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
    srums.connect.push(getSrumNetworkConnectivity(entry));
    srums.energy.push(getSrumEnergyUsage(entry));
    srums.energyinfo.push(getSrumEnergyInfo(entry));
    srums.notifs.push(getSrumNotifications(entry));
    srums.netinfo.push(getSrumNetworkInfo(entry));
    srums.vfu.push(getSrumApplicationVfu(entry));
    srums.timeline.push(getSrumApplicationTimeline(entry));
  }

  return srums;
}

/**
 * `Artemis` is able to parse nearly all the of the Registry files with no errors.
 * The files with a few issues are the Zimmerman files. All of the issues are expected and are relatively minor.
 *
 * The Zimmerman Registry files/minefield `artemis` gracefully returns errors it gets back to the caller. Known errors:
 *  - Correctly fails to parse non-Registry files (ex: `NotAHive` ). These errors are expected and are **OK**
 *  - Correctly fails to parse one (1) unallocated FILETIME/QWORD data value associated with file `SAM_DUPENAME`. `Artemis` only supports allocated data right now, so this error **ok**
 *    - The error above then triggers an error related to iterating through the values of an empty RegResourceList at `SAM\SAM\Domains\Builtin\Aliases\Members\S-1-5-21-4271176276-4210259494-4108073714` associated with file `SAM_DUPENAME`.
 *    - Reviewing the Key manually shows the the data is empty. The Registry is suppose to label the data `RegNone`, instead its labeled `RegResourceList`.
 *    - Since the data is labeled `RegResourceList` `artemis` attempts to parse it. **BUT** before parsing the data `artemis` checks to make sure the data is allocated. Since the data is **unallocated** it generates the first error above and does not parse it.
 *    - These errors also show up when parsing Win2012R2 `SAM` file at key `CsiTool-CreateHive-{00000000-0000-0000-0000-000000000000}\SAM\Domains\Builtin\Aliases`
 *    - Ultimately these errors are expected and are **ok**
 *
 * `Artemis` also logs seven (7) warnings about not being able to extract UTF16 strings. Sometimes Registry keys can contain gibberish string data
 * All of these warnings came from `NTUSER slack.DAT`, `artemis` does **not** support parsing any Registry slack data
 *
 * @returns An array of all parsed Registry files with all of their entries
 */
async function bulkRegistry(): Promise<Registry[][]> {
  const regs: Registry[][] = [];
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

  /**
   * Zimmermerman's test files are a minefield. Lots of different types, some corrupted, some malformed, some with odd values, some not even a Registry.
   * All are good targets for testing. `Artemis` should gracefully error when encountering something wrong and return to caller (this script) to handle.
   *
   * We handle it by just using try/catch
   */
  const zim_paths = [
    `${start_path}\\Windows\\Registry\\Win7\\EricZimmerman`,
  ];

  for (const entry of zim_paths) {
    for (const file of await readDir(entry)) {
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
