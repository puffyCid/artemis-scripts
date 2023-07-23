// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_pe(path) {
    const data = Deno.core.ops.get_pe(path);
    if (data === "") {
        return null;
    }
    const pe = JSON.parse(data);
    return pe;
}
function getPe(path) {
    return get_pe(path);
}
function main() {
    const drive = getEnvValue("SystemDrive");
    if (drive === undefined) {
        return [];
    }
    const path = `${drive}\\Windows\\System32`;
    const pes = [];
    for (const entry of readDir(path)){
        if (!entry.is_file) {
            continue;
        }
        const pe_path = `${path}\\${entry.filename}`;
        const info = getPe(pe_path);
        if (info === null) {
            continue;
        }
        const meta = {
            path: pe_path,
            pe: info
        };
        pes.push(meta);
    }
    return pes;
}
main();

