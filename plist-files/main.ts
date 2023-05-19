import { getPlist } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

interface PlistData {
  plist_content: Record<string, unknown>;
  file: string;
}

/**
 * Script to parse all plist files found under `/Users`
 * @returns Array of parsed plist files and their location
 */
function main(): PlistData[] {
  const start_path = "/Users";

  const plist_files: PlistData[] = [];
  recurse_dir(plist_files, start_path);
  return plist_files;
}

/**
 * Simple function to recursively walk the filesystem
 * @param plist_files Array to track parsed plist files
 * @param start_path Directory to transverse
 */
function recurse_dir(
  plist_files: PlistData[],
  start_path: string,
) {
  for (const entry of Deno.readDirSync(start_path)) {
    const plist_path = `${start_path}/${entry.name}`;

    // Only parsing files that have plist extension
    if (entry.isFile && entry.name.endsWith("plist")) {
      const data = getPlist(plist_path);
      if (data === null) {
        continue;
      }

      // Take the parsed content and associate content with file and append to array
      const plist_info: PlistData = {
        plist_content: data,
        file: plist_path,
      };
      plist_files.push(plist_info);
      continue;
    }

    if (entry.isDirectory) {
      recurse_dir(plist_files, plist_path);
    }
  }
}

main();
