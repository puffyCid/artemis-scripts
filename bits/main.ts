import { getBits } from "https://github.com/puffycid/artemis-api/mod.ts";
import { Bits } from "https://github.com/puffycid/artemis-api/src/windows/bits.ts";

function main(): Bits {
  const carve = true;
  const entries = getBits(carve);
  return entries;
}

main();
