import { getUsnJrnl } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

/**
 * @returns Array of all Rust files in the `UsnJrnl`
 */
function main() {
  const jrnl_entries = getUsnJrnl();
  const rs_entries = [];

  // For really really large arrays for..of is actually pretty slow
  // USNJrnl can contain 100k to 400k entries
  for (let entry = 0; entry < jrnl_entries.length; entry++) {
    if (jrnl_entries[ entry ].extension === "rs") {
      rs_entries.push(jrnl_entries[ entry ]);
    }
  }

  return rs_entries;
}

main();
