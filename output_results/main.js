// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/processes.ts
function get_win_processes(md5, sha1, sha256, pe_info) {
  const hashes = {
    md5,
    sha1,
    sha256,
  };
  const data = Deno[Deno.internal].core.ops.get_processes(
    JSON.stringify(hashes),
    pe_info,
  );
  const proc_array = JSON.parse(data);
  return proc_array;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/output.ts
function outputResults(data, data_name, output) {
  const output_string = JSON.stringify(output);
  const status = Deno[Deno.internal].core.ops.output_results(
    data,
    data_name,
    output_string,
  );
  return status;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getWinProcesses(md5, sha1, sha256, pe_info) {
  return get_win_processes(md5, sha1, sha256, pe_info);
}

// main.ts
function main() {
  const md5 = false;
  const sha1 = false;
  const sha256 = false;
  const pe_info = false;
  const proc_list = getWinProcesses(md5, sha1, sha256, pe_info);
  for (const entry of proc_list) {
    if (entry.name.includes("artemis")) {
      const out = {
        name: "artemis_proc",
        directory: "./tmp",
        format: "jsonl", /* JSON */
        compress: true,
        endpoint_id: "anything-i-want",
        collection_id: 1,
        output: "local", /* LOCAL */
      };
      const status = outputResults(JSON.stringify(entry), "artemis_info", out);
      if (!status) {
        console.log("Could not output to local directory");
      }
    }
  }
}
main();
