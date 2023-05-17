// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_fsevents() {
    const data = Deno[Deno.internal].core.ops.get_fsevents(false);
    if (data === "") {
        return [];
    }
    const fsevents = JSON.parse(data);
    return fsevents;
}
function getFsEvents() {
    return get_fsevents();
}
function main() {
    const data = getFsEvents();
    const rs_data = [];
    for (const entry of data){
        if (entry.path.includes("rs")) {
            rs_data.push(entry);
        }
    }
    return rs_data;
}
main();

