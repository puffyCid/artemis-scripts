import {
  cocoatimeToUnixEpoch,
  fatToUnixEpoch,
  filetimeToUnixEpoch,
  hfsToUnixEpoch,
  oleToUnixEpoch,
  timeNow,
  webkitToUnixEpoch,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/time/conversion.ts";

function main() {
  let data = timeNow();
  const big = 132244766418940254n;
  data = filetimeToUnixEpoch(big);

  const fattest = [123, 79, 195, 14];
  data = fatToUnixEpoch(Uint8Array.from(fattest));

  let test = 43794.01875;
  data = oleToUnixEpoch(test);
  test = 10.01875;
  data = cocoatimeToUnixEpoch(test);

  test = 13289983960;
  data = webkitToUnixEpoch(test);

  test = 3453120824;
  data = hfsToUnixEpoch(test);

  console.log(data);
}

main();
