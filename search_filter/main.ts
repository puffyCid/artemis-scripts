import { SearchEntry } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/search.ts";

/**
 * Filters a provided Windows Search arguement to only return entries that have ".lnk" string in properties
 * Two arguments are always provided:
 *   - First is the parsed data serialized into JSON string
 *   - Second is the artifact name (ex: "search")
 * @returns Array of `SearchEntry` that have ".lnk" in their properties or the original data if not Windows Search data
 */
function main() {
  // Since this is a filter script our data will be passed as a Serde Value that is a string
  const args = Deno.args;
  if (args.length < 2) {
    return [];
  }

  // We are only interested in filtering Windows Search data, anything else we do not touch
  if (args[1] != "search") {
    return JSON.parse(args[0]);
  }

  // Parse the provide Serde Value (JSON string) as a SearchEntry[]
  const data: SearchEntry[] = JSON.parse(args[0]);
  const filter_entries: SearchEntry[] = [];

  for (const entry of data) {
    // There are almost 600 different types of properties (metadata on each entry)
    // Instead of trying to check them all, just turn it into a string and check if it contains a ".lnk" string
    if (!JSON.stringify(entry.properties).includes(".lnk")) {
      continue;
    }

    filter_entries.push(entry);
  }

  return filter_entries;
}

main();
