// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_lnk_file(path) {
    const data = Deno.core.ops.get_lnk_file(path);
    const lnk = JSON.parse(data);
    return lnk;
}
function getLnkFile(path) {
    return get_lnk_file(path);
}
function main() {
    const drive = getEnvValue("SystemDrive");
    if (drive === undefined) {
        return [];
    }
    const users = `${drive}\\Users`;
    const recent_files = [];
    for (const entry of readDir(users)){
        try {
            const path = `${users}\\${entry.filename}\\AppData\\Roaming\\Microsoft\\Windows\\Recent`;
            for (const entry of readDir(path)){
                if (!entry.name.endsWith("lnk")) {
                    continue;
                }
                const lnk_file = `${path}\\${entry.filename}`;
                const lnk = getLnkFile(lnk_file);
                recent_files.push(lnk);
            }
        } catch (_error) {
            continue;
        }
    }
    return recent_files;
}
main();

