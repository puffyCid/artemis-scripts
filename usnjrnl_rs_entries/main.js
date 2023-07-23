// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_usnjrnl() {
    const data = Deno.core.ops.get_usnjrnl();
    const jrnl_array = JSON.parse(data);
    return jrnl_array;
}
function getUsnJrnl() {
    return get_usnjrnl();
}
function main() {
    const jrnl_entries = getUsnJrnl();
    const rs_entries = [];
    for(let entry = 0; entry < jrnl_entries.length; entry++){
        if (jrnl_entries[entry].extension === "rs") {
            rs_entries.push(jrnl_entries[entry]);
        }
    }
    return rs_entries;
}
main();

