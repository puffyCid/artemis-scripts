// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_prefetch() {
    const data = Deno.core.ops.get_prefetch();
    const pf = JSON.parse(data);
    return pf;
}
function getPrefetch() {
    return get_prefetch();
}
function main() {
    const pf = getPrefetch();
    return pf;
}
main();

