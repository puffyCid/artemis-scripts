// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_shellbags(resolve_guids) {
    const data = Deno[Deno.internal].core.ops.get_shellbags(resolve_guids);
    const bags_array = JSON.parse(data);
    return bags_array;
}
function getShellbags(resolve_guids) {
    return get_shellbags(resolve_guids);
}
function main() {
    const bags = getShellbags(true);
    return bags;
}
main();

