// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_macho(path) {
    const data = Deno[Deno.internal].core.ops.get_macho(path);
    if (data === "") {
        return null;
    }
    const macho = JSON.parse(data);
    return macho;
}
function getMacho(path) {
    return get_macho(path);
}
function main() {
    const bin_path = "/bin";
    const machos = [];
    for (const entry of Deno.readDirSync(bin_path)){
        if (!entry.isFile) {
            continue;
        }
        const macho_path = `${bin_path}/${entry.name}`;
        const info = getMacho(macho_path);
        if (info === null) {
            continue;
        }
        const meta = {
            path: macho_path,
            macho: info
        };
        machos.push(meta);
    }
    return machos;
}
main();

