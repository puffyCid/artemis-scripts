import { processListing } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/memory.ts";

function main() {
  const md5 = true;
  const sha1 = false;
  const sha256 = false;
  const binary_info = true;

  const proc_list = processListing(md5, sha1, sha256, binary_info);
  return proc_list;
}

main();
