// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function get_users() {
    const data = Deno[Deno.internal].core.ops.get_users();
    const users = JSON.parse(data);
    return users;
}
function get_groups() {
    const data = Deno[Deno.internal].core.ops.get_groups();
    const groups = JSON.parse(data);
    return groups;
}
function getUsers() {
    return get_users();
}
function getGroups() {
    return get_groups();
}
function main() {
    const users = getUsers();
    const groups = getGroups();
    const accounts = {
        users,
        groups
    };
    return accounts;
}
main();

