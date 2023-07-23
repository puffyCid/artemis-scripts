// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_srum_application_info(path) {
    const name = "{D10CA2FE-6FCF-4F6D-848E-B2E99266FA89}";
    const data = Deno.core.ops.get_srum(path, name);
    const srum = JSON.parse(data);
    return srum;
}
function getSrumApplicationInfo(path) {
    return get_srum_application_info(path);
}
function main() {
    const path = "C:\\Windows\\System32\\sru\\SRUDB.dat";
    const entries = getSrumApplicationInfo(path);
    return entries;
}
main();

