import { processListing } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/memory.ts";
import { VirusTotal } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/http/vt.ts";
import {
  VTData,
  VTFile,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/types/http/vt.ts";
interface ProcVT {
  proc: unknown;
  vt: VTFile;
}
async function main() {
  const key = "<YOUR API KEY HERE>";
  const vtClient = new VirusTotal(key);

  const processes = processListing(true);
  let count = 0;
  const publicLimit = 4;

  const vtProc = [];
  for (const proc of processes) {
    // Public API limited to 4 lookups per min :(
    if (count >= publicLimit) {
      break;
    }

    const md5 = proc.md5;
    const vtResponse = await vtClient.lookupHash(md5);
    if (vtResponse instanceof Error) {
      continue;
    }

    count += 1;

    if (vtResponse.status != 200) {
      continue;
    }

    const file = vtResponse.body as VTData;

    const procVT: ProcVT = {
      proc,
      vt: file.data.attributes as VTFile,
    };

    vtProc.push(procVT);
  }

  console.log(vtProc[0]);
}

main();
