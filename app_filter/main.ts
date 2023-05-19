import { MacosFileInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/files.ts";

/**
 * Filters a provided file listing arguement to only return Info.plist files from /Applications
 * Two arguments are always provided:
 *   - First is the parsed data serialized into JSON string
 *   - Second is the artifact name (ex: "amcache")
 * @returns Array of files only containing Info.plist
 */
function main() {
  // Since this is a filter script our data will be passed as a Serde Value that is a string
  const args = Deno.args;
  if (args.length === 0) {
    return [];
  }

  // Parse the provide Serde Value (JSON string) as a MacosFileInfo[]
  const data: MacosFileInfo[] = JSON.parse(args[ 0 ]);
  const filter_files: MacosFileInfo[] = [];

  for (const entry of data) {
    if (entry.filename == "Info.plist") {
      filter_files.push(entry);
    }
  }
  return filter_files;
}

main();
