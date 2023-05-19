// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/loginitems.ts
function get_loginitems() {
  const data = Deno[Deno.internal].core.ops.get_loginitems();
  const items = JSON.parse(data);
  return items;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/macho.ts
function get_macho(path) {
  const data = Deno[Deno.internal].core.ops.get_macho(path);
  if (data === "") {
    return null;
  }
  const macho = JSON.parse(data);
  return macho;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/plist.ts
function get_plist(path) {
  const data = Deno[Deno.internal].core.ops.get_plist(path);
  if (data === "") {
    return null;
  }
  const log_data = JSON.parse(data);
  return log_data;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getPlist(path) {
  return get_plist(path);
}
function getMacho(path) {
  return get_macho(path);
}
function getLoginItems() {
  return get_loginitems();
}

// main.ts
function grabLoginItems() {
  const data = getLoginItems();
  const itemsMacho = [];
  for (const entry of data) {
    try {
      const item = {
        items: entry,
        macho: getMacho(entry.path.join("/")),
      };
      itemsMacho.push(item);
    } catch (_e) {
      const item = {
        items: entry,
        macho: null,
      };
      itemsMacho.push(item);
    }
  }
  return itemsMacho;
}
function filterLogs(data) {
  const logs = [];
  const logData = JSON.parse(data);
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
function filterEvents(data) {
  const events = [];
  const eventsData = JSON.parse(data);
  for (const entry of eventsData) {
    if (!entry.path.includes(".dmg") && !entry.path.startsWith("/tmp")) {
      continue;
    }
    events.push(entry);
  }
  return events;
}
function filterApps(data) {
  const apps = [];
  const filesData = JSON.parse(data);
  for (let entry = 0; entry < filesData.length; entry++) {
    if (
      filesData[entry].full_path.includes(".app") &&
      filesData[entry].filename != "Info.plist"
    ) {
      continue;
    }
    const app = {
      app_path: filesData[entry].directory,
      info_plist: filesData[entry].full_path,
      plist: getPlist(filesData[entry].full_path),
    };
    apps.push(app);
  }
  return apps;
}
function main() {
  const args = Deno.args;
  if (args.length < 2) {
    return grabLoginItems();
  }
  if (args[1] === "unifiedlogs") {
    return filterLogs(args[0]);
  }
  if (args[1] === "fseventsd") {
    return filterEvents(args[0]);
  }
  if (args[1] === "files") {
    return filterApps(args[0]);
  }
  return JSON.parse(args[0]);
}
main();
