import { WindowsFileInfo } from "https://github.com/puffycid/artemis-api/src/windows/files.ts";

/**
 * This script filters a filelisting to only show files created in the last 14 days
 * @returns Array of file entries created in the last 14 days
 */
function main() {
  const args = Deno.args;

  if (args.length === 0) {
    return [];
  }

  const data: WindowsFileInfo[] = JSON.parse(args[ 0 ]);

  const time_now = new Date();
  // Get current time
  const milliseconds = time_now.getTime();
  const seconds = milliseconds / 1000;
  const fourteen_days = 1209600;

  // We want all files created in the last fourteen (14) days
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
