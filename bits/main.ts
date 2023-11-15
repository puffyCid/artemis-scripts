import { getBits } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { Bits } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/types/windows/bits.d.ts";

function main(): Bits {
  const carve = true;
  const entries = getBits(carve);

  return entries;
}

main();
