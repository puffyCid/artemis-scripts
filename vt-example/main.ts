import { processListing } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/memory.ts";
import { VirusTotal } from "../../artemis-api/src/http/vt.ts";
import { VTFile } from "../../artemis-api/types/http/vt.ts";

interface ProcVT {
  proc: unknown;
  vt: VTFile;
}
async function main() {
  const key = "<YOUR KEY HERE!!>";
  const vtClient = new VirusTotal(key);

  const processes = processListing(true);
  let count = 0;
  const publicLimit = 4;

  const vtProc = [];
  for (const proc of processes) {
    count += 1;
    const md5 = proc.md5;
    const vtResponse = await vtClient.lookupHash(md5);
    if (vtResponse instanceof Error) {
      continue;
    }

    const procVT: ProcVT = {
      proc,
      vt: vtResponse.body as VTFile,
    };

    vtProc.push(procVT);
    // Public API limited to 4 lookups per min :(
    if (count >= publicLimit) {
      break;
    }
  }

  console.log(vtProc);
}

main();