// main.ts
function main() {
  const args = STATIC_ARGS;
  if (args.length < 2) {
    return [];
  }
  if (args[1] != "search") {
    return JSON.parse(args[0]);
  }
  const data = JSON.parse(args[0]);
  const filter_entries = [];
  for (const entry of data) {
    if (!JSON.stringify(entry.properties).includes(".lnk")) {
      continue;
    }
    filter_entries.push(entry);
  }
  return filter_entries;
}
main();
