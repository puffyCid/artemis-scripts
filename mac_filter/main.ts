import {
  getLoginItems,
  getMacho,
  getPlist,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { MacosFileInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/files.ts";
import { Fsevents } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/fsevents.ts";
import { LoginItems } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/loginitems.ts";
import { MachoInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/macho.ts";
import { UnifiedLog } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/unifiedlogs.ts";

interface LogiItemsMacho {
  items: LoginItems;
  macho: MachoInfo[] | null;
}

/**
 * Function to get a list of `LoginItems` and parsed `macho` data associated with them
 * @returns Array of `LoginItems` with parsed `macho` data
 */
function grabLoginItems(): LogiItemsMacho[] {
  const data = getLoginItems();
  const itemsMacho: LogiItemsMacho[] = [];

  for (const entry of data) {
    try {
      const item: LogiItemsMacho = {
        items: entry,
        macho: getMacho(entry.path.join("/")),
      };
      itemsMacho.push(item);
    } catch (_e) {
      const item: LogiItemsMacho = {
        items: entry,
        macho: null,
      };
      itemsMacho.push(item);
    }
  }

  return itemsMacho;
}

/**
 * Function to filter `UnifiedLog` data looking for sudo or osascript entries
 * @param data serialized JSON string representing `UnifiedLog[]` data
 * @returns A filtered `UnifiedLog` data containing sudo or osascript entries
 */
function filterLogs(data: string): UnifiedLog[] {
  const logs: UnifiedLog[] = [];
  const logData: UnifiedLog[] = JSON.parse(data);

  for (let entry = 0; entry < logData.length; entry++) {
    if (
      !logData[entry].message.includes("sudo") &&
      !logData[entry].message.includes("osascript")
    ) {
      continue;
    }

    logs.push(logData[entry]);
  }

  return logs;
}

/**
 * Function to filter `FsEvents` data looking from `.dmg` or `/tmp` entries
 * @param data serialized JSON string representing `FsEvents[]`
 * @returns Filtered `FsEvents[]` only containing event entries that contain `.dmg` or `/tmp`
 */
function filterEvents(data: string): Fsevents[] {
  const events: Fsevents[] = [];
  const eventsData: Fsevents[] = JSON.parse(data);

  for (const entry of eventsData) {
    if (!entry.path.includes(".dmg") && !entry.path.startsWith("/tmp")) {
      continue;
    }

    events.push(entry);
  }

  return events;
}

interface AppsInfo {
  app_path: string;
  info_plist: string;
  plist: Record<string, unknown> | null;
}

/**
 * Function to filter filelisting to return list of installed apps in /Applications
 * @param data searialized JSON string representing `MacosFileInfo[]`
 * @returns Filtered file listing to return list of Apps (.app) and their associated `Info.plist` contents
 */
function filterApps(data: string): AppsInfo[] {
  const apps: AppsInfo[] = [];
  const filesData: MacosFileInfo[] = JSON.parse(data);

  for (let entry = 0; entry < filesData.length; entry++) {
    if (
      filesData[entry].full_path.includes(".app") &&
      filesData[entry].filename != "Info.plist"
    ) {
      continue;
    }

    const app: AppsInfo = {
      app_path: filesData[entry].directory,
      info_plist: filesData[entry].full_path,
      plist: getPlist(filesData[entry].full_path),
    };

    apps.push(app);
  }

  return apps;
}

/**
 * Script that is both a regular artemis script and a filter script
 * @returns Anything
 */
function main() {
  const args = Deno.args;

  // If we received no filtered data (args.length === 0)
  // Then we wil run as a regular script
  if (args.length < 2) {
    return grabLoginItems();
  }

  // If we recevied two arguements then we check what data was provided
  // If unifiedlogs, fsevents, or files we will filter the data
  // Otherwise we return the data back unfiltered

  if (args[1] === "unifiedlogs") {
    return filterLogs(args[0]);
  }

  if (args[1] === "fseventsd") {
    return filterEvents(args[0]);
  }

  if (args[1] === "files") {
    return filterApps(args[0]);
  }

  // We received unknown type of data, returning back unfiltered
  return JSON.parse(args[0]);
}

main();
