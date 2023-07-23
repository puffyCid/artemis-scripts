// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_loginitems() {
    const data = Deno.core.ops.get_loginitems();
    const items = JSON.parse(data);
    return items;
}
function getLoginItems() {
    return get_loginitems();
}
function main() {
    const data = getLoginItems();
    return data;
}
main();

