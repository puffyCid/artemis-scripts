// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/execpolicy.ts
function get_execpolicy() {
  const data = Deno[Deno.internal].core.ops.get_execpolicy();
  const policy = JSON.parse(data);
  return policy;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts
function getExecPolicy() {
  return get_execpolicy();
}

// main.ts
function main() {
  const data = getExecPolicy();
  return data;
}
main();
