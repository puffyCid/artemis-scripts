import {
  encodeBytes,
  extractUtf8String,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/encoding/mod.ts";
import { take } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/nom/mod.ts";

function main() {
  const result = take("hello world!", 5);
  if (result instanceof Error) {
    console.error(`Failed to nom string: ${result}`);
    return result;
  }

  console.log(
    `I nommed: '${result.nommed}'. I have remaining: '${result.remaining}'`,
  );

  const bytes = encodeBytes("hello world!");

  const rsultBytes = take(bytes, 5);
  if (rsultBytes instanceof Error) {
    console.error(`Failed to nom bytes: ${result}`);
    return result;
  }

  console.log(
    `I nommed bytes: ${rsultBytes.nommed}. String remaining (via bytes to string): ${
      extractUtf8String(rsultBytes.remaining as Uint8Array)
    }`,
  );
}

main();
