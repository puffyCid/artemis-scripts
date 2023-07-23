// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_userassist() {
    const data = Deno.core.ops.get_userassist();
    const assist_array = JSON.parse(data);
    return assist_array;
}
function getUserAssist() {
    return get_userassist();
}
function main() {
    const assist = getUserAssist();
    return assist;
}
main();

