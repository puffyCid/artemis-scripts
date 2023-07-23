// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_eventlogs(path) {
    const data = Deno.core.ops.get_eventlogs(path);
    const log_array = JSON.parse(data);
    return log_array;
}
function getEventLogs(path) {
    return get_eventlogs(path);
}
function main() {
    const path = "C:\\Windows\\System32\\winevt\\Logs\\System.evtx";
    const records = getEventLogs(path);
    const service_installs = [];
    for (const record of records){
        if (record.data["Event"]["System"]["EventID"] != 7045 && record.data["Event"]["System"]["EventID"]["#text"] != 7045) {
            continue;
        }
        service_installs.push(record);
    }
    return service_installs;
}
main();

