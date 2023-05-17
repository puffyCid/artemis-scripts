// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_custom_shimdb(path) {
    const data = Deno[Deno.internal].core.ops.get_custom_shimdb(path);
    if (data === "") {
        return null;
    }
    const shim_array = JSON.parse(data);
    return shim_array;
}
function getCustomShimdb(path) {
    return get_custom_shimdb(path);
}
function main() {
    const drive = Deno.env.get("SystemDrive");
    if (drive === undefined) {
        return [];
    }
    const users = `${drive}\\Users`;
    const custom_sdb = [];
    recurse_dir(custom_sdb, users);
    return custom_sdb;
}
function recurse_dir(sdbs, start_path) {
    for (const entry of Deno.readDirSync(start_path)){
        const sdb_path = `${start_path}\\${entry.name}`;
        if (entry.isFile) {
            const data = getCustomShimdb(sdb_path);
            if (data === null) {
                continue;
            }
            sdbs.push(data);
        }
        if (entry.isDirectory) {
            recurse_dir(sdbs, sdb_path);
        }
    }
}
main();

