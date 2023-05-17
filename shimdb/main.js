// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_shimdb() {
    const data = Deno[Deno.internal].core.ops.get_shimdb();
    const shim_array = JSON.parse(data);
    return shim_array;
}
function getShimdb() {
    return get_shimdb();
}
function main() {
    const sdb = getShimdb();
    return sdb;
}
main();

