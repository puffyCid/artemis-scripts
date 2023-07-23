// main.ts
function main() {
  const args = STATIC_ARGS;
  if (args.length === 0) {
    return [];
  }
  const data = JSON.parse(args[0]);
  const time_now = new Date();
  const milliseconds = time_now.getTime();
  const seconds = milliseconds / 1e3;
  const fourteen_days = 1209600;
  const earliest_start = seconds - fourteen_days;
  const filter_data = [];
  for (const entry of data) {
    if (entry.created < earliest_start) {
      continue;
    }
    filter_data.push(entry);
  }
  return filter_data;
}
main();
