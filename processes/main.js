// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_win_processes(md5, sha1, sha256, pe_info) {
    const hashes = {
        md5,
        sha1,
        sha256
    };
    const data = Deno.core.ops.get_processes(JSON.stringify(hashes), pe_info);
    const proc_array = JSON.parse(data);
    return proc_array;
}
function getWinProcesses(md5, sha1, sha256, pe_info) {
    return get_win_processes(md5, sha1, sha256, pe_info);
}
function main() {
    const proc_list = getWinProcesses(true, false, false, true);
    return proc_list;
}
main();

