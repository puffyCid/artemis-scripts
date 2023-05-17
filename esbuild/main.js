// https://github.com/puffycid/artemis-api/src/windows/processes.ts
function get_processes(md5, sha1, sha256, pe_info) {
  const data = Deno[Deno.internal].core.ops.get_processes(
    md5,
    sha1,
    sha256,
    pe_info,
  );
  const proc_array = JSON.parse(data);
  return proc_array;
}

// https://github.com/puffycid/artemis-api/mod.ts
function getProcesses(md5, sha1, sha256, pe_info) {
  return get_processes(md5, sha1, sha256, pe_info);
}

// main.ts
function main() {
  const md5 = true;
  const sha1 = false;
  const sha256 = false;
  const pe_info = true;
  const proc_list = getProcesses(md5, sha1, sha256, pe_info);
  return proc_list;
}
main();
