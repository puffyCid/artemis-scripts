// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_emond() {
    const data = Deno[Deno.internal].core.ops.get_emond();
    const emond = JSON.parse(data);
    return emond;
}
function getEmond() {
    return get_emond();
}
function main() {
    const data = getEmond();
    return data;
}
main();

