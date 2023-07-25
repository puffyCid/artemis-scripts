import { encode, decode, extractUtf8String } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/encoding/mod.ts";
function main() {
  const test = "Deno is very cool!";
  const data = encode(test);
  const value = decode(data);

  const result = extractUtf8String(value);
  console.log(value);

  return result;
}

main();