import { encodeBytes } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/encoding/bytes.ts";
import { extractUtf8String } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/encoding/strings.ts";
import {
  Protocol,
  request,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/http/client.ts";

async function main() {
  const url = "https://httpbin.org/user-agent";
  const body = "";

  const res = await request(url, Protocol.GET, encodeBytes(body));
  console.log(JSON.parse(extractUtf8String(new Uint8Array(res.body))));
  return res;
}

main();
