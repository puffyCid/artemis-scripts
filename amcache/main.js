// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_amcache() {
    const data = Deno[Deno.internal].core.ops.get_amcache();
    const amcache_array = JSON.parse(data);
    return amcache_array;
}
function getAmcache() {
    return get_amcache();
}
function main() {
    const cache = getAmcache();
    return cache;
}
main();

