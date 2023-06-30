import {
  getWinProcesses,
  outputResults,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import {
  Format,
  Output,
  OutputType,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/output.ts";

function main() {
  const md5 = true;
  const sha1 = false;
  const sha256 = false;
  const pe_info = true;

  const proc_list = getWinProcesses(md5, sha1, sha256, pe_info);
  for (const entry of proc_list) {
    if (entry.name.includes("artemis")) {
      const out: Output = {
        name: "artemis_proc",
        directory: "./tmp",
        format: Format.JSON,
        compress: false,
        endpoint_id: "anything-i-want",
        collection_id: 1,
        output: OutputType.LOCAL,
      };
      const status = outputResults(JSON.stringify(entry), "artemis_info", out);
      if (!status) {
        console.log("Could not output to local directory");
      }
    }
  }
}

main();
