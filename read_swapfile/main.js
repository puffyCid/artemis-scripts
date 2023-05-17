// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function decode(b64) {
    const binString = atob(b64);
    const size = binString.length;
    const bytes = new Uint8Array(size);
    for(let i = 0; i < size; i++){
        bytes[i] = binString.charCodeAt(i);
    }
    return bytes;
}
function read_raw_file(path) {
    const data = Deno[Deno.internal].core.ops.read_raw_file(path);
    return decode(data);
}
function readRawFile(path) {
    return read_raw_file(path);
}
function main() {
    const drive = Deno.env.get("SystemDrive");
    if (drive === undefined) {
        return 0;
    }
    try {
        const swap = `${drive}\\swapfile.sys`;
        const info = Deno.statSync(swap);
        if (!info.isFile) {
            return 0;
        }
        if (info.size > 2147483648) {
            return 0;
        }
        const data = readRawFile(swap);
        return data.length;
    } catch (_error) {
        return 0;
    }
}
main();

