// main.ts
function main() {
  const args = STATIC_ARGS;
  if (args.length === 0) {
    return [];
  }
  const data = JSON.parse(args[0]);
  const filter_files = [];
  for (const entry of data) {
    if (entry.filename == "Info.plist") {
      filter_files.push(entry);
    }
  }
  return filter_files;
}
main();
