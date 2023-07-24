import { getBits } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { Bits } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/windows/bits.ts";

function main(): Bits {
  const carve = true;
  const entries = getBits(carve);

  return entries;
}

main();
