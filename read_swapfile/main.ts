import { readRawFile } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

/**
 * Simple function to show that we can read any locked file
 * `swapfile.sys` contains memory written to disk. (Similar to `pagefile.sys`)
 * @returns Length of the swapfile.sys if it exists
 */
function main() {
  const drive = Deno.env.get("SystemDrive");
  if (drive === undefined) {
    return 0;
  }
  try {
    const swap = `${drive}\\swapfile.sys`;
    const info = Deno.statSync(swap);

    if (!info.isFile) {
      return 0;
    }

    const max_size = 2147483648;
    // Yes we can get the size via stat function
    // But we only want to read it (if its not too big)
    if (info.size > max_size) {
      return 0;
    }

    const data = readRawFile(swap);
    return data.length;
  } catch (_error) {
    return 0;
  }
}

main();
