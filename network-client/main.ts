import { Protocol, request } from "../../artemis-api/src/http/client.ts";
import { encodeBytes } from "../../artemis-api/src/encoding/bytes.ts";
import { extractUtf8String } from "../../artemis-api/src/encoding/strings.ts";

async function main() {
  const url = "https://httpbin.org/user-agent";
  const body = "";

  const res = await request(url, Protocol.GET, encodeBytes(body));
  console.log(JSON.parse(extractUtf8String(new Uint8Array(res.body))));
  return res;
}

main();
