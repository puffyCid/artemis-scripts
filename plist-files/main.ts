import { getPlist } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { readDir } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";
import {
  Format,
  Output,
  outputResults,
  OutputType,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/output.ts";

interface PlistData {
  plist_content: Record<string, unknown> | number[];
  file: string;
}

/**
 * Script to parse all plist files found under `/Users`
 * @returns Array of parsed plist files and their location
 */
async function main(): Promise<PlistData[]> {
  const start_path = "/Users";

  const plist_files: PlistData[] = [];
  await recurse_dir(plist_files, start_path);
  return plist_files;
}

/**
 * Simple function to recursively walk the filesystem
 * @param plist_files Array to track parsed plist files
 * @param start_path Directory to transverse
 */
async function recurse_dir(
  plist_files: PlistData[],
  start_path: string,
) {
  if (plist_files.length > 20) {
    const out: Output = {
      name: "artemis_plist",
      directory: "./tmp",
      format: Format.JSON,
      compress: false,
      endpoint_id: "anything-i-want",
      collection_id: 1,
      output: OutputType.LOCAL,
    };
    const status = outputResults(
      JSON.stringify(plist_files),
      "artemis_info",
      out,
    );
    if (!status) {
      console.log("Could not output to local directory");
    }
    plist_files = [];
  }
  for (const entry of await readDir(start_path)) {
    const plist_path = `${start_path}/${entry.filename}`;

    // Only parsing files that have plist extension
    if (entry.is_file && entry.filename.endsWith("plist")) {
      try {
        const data = getPlist(plist_path);
        if (data instanceof Error) {
          continue;
        }
        // Take the parsed content and associate content with file and append to array
        const plist_info: PlistData = {
          plist_content: data,
          file: plist_path,
        };
        plist_files.push(plist_info);
      } catch (_err) {
        continue;
      }
      continue;
    }

    if (entry.is_directory) {
      await recurse_dir(plist_files, plist_path);
    }
  }
}

main();
