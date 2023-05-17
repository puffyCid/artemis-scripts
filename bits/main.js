// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_bits(carve) {
    const data = Deno[Deno.internal].core.ops.get_bits(carve);
    const bits = JSON.parse(data);
    return bits;
}
function getBits(carve) {
    return get_bits(carve);
}
function main() {
    const entries = getBits(true);
    return entries;
}
main();

