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

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getWinProcesses(md5, sha1, sha256, pe_info) {
  return get_win_processes(md5, sha1, sha256, pe_info);
}

// main.ts
function main() {
  const md5 = true;
  const sha1 = false;
  const sha256 = false;
  const pe_info = true;
  const proc_list = getWinProcesses(md5, sha1, sha256, pe_info);
  return proc_list;
}
main();
