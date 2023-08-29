import {
  Endian,
  nom_signed_eight_bytes,
  nom_signed_four_bytes,
  nom_unsigned_two_bytes,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/nom/helpers.ts";
import {
  nom_signed_two_bytes,
  nom_unsigned_eight_bytes,
  nom_unsigned_four_bytes,
  nom_unsigned_one_bytes,
  nom_unsigned_sixteen_bytes,
  take_while,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/nom/mod.ts";
import {
  take,
  take_until,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/nom/parsers.ts";

function main() {
  const result = take_while("aaaaacrab!", "a");
  if (result instanceof Error) {
    console.error(`Failed to nom string: ${result}`);
    return result;
  }

  console.log(
    `I nommed: '${result.nommed}'. I have remaining: '${result.remaining}'`,
  );

  const bytes = new Uint8Array([0, 0, 0, 0, 1]);

  const rsultBytes = take_while(bytes, 0);
  if (rsultBytes instanceof Error) {
    console.error(`Failed to nom bytes: ${rsultBytes.message}`);
    return result;
  }

  console.log(
    `I nommed bytes: ${rsultBytes.nommed}. String remaining (via bytes to string): ${rsultBytes.remaining}`,
  );

  let test = "a,simple,csv,string";
  while (test.includes(",")) {
    const result = take_until(test, ",");
    if (result instanceof Error) {
      console.error(`Failed to nom string: ${result}`);
      return result;
    }
    const remain = take(result.remaining, 1);
    if (remain instanceof Error) {
      console.error(`Failed to nom remain string: ${result}`);
      return result;
    }
    test = remain.remaining as string;
    console.log(result.nommed);
  }

  const bytes2 = new Uint8Array([1, 0, 0, 13, 223]);
  const stop = new Uint8Array([223]);
  const resultBytes = take_until(bytes2, stop);
  if (resultBytes instanceof Error) {
    console.error(`Failed to nom bytes until: ${resultBytes.message}`);
    return result;
  }
  //console.log(resultBytes);

  helpers();
}

function helpers() {
  const bytes = new Uint8Array([
    1,
    2,
    34,
    8,
    1,
    2,
    34,
    8,
    1,
    2,
    34,
    8,
    1,
    2,
    34,
    8,
    1,
    2,
    34,
    8,
  ]);
  let result = nom_unsigned_one_bytes(bytes, Endian.Le);
  if (result instanceof Error) {
    console.error(`Failed to nom bytes: ${result.message}`);
    return result;
  }

  result = nom_unsigned_two_bytes(bytes, Endian.Le);
  if (result instanceof Error) {
    console.error(`Failed to nom bytes: ${result.message}`);
    return result;
  }
  result = nom_unsigned_four_bytes(bytes, Endian.Le);
  if (result instanceof Error) {
    console.error(`Failed to nom bytes: ${result.message}`);
    return result;
  }
  result = nom_unsigned_eight_bytes(bytes, Endian.Le);
  if (result instanceof Error) {
    console.error(`Failed to nom bytes: ${result.message}`);
    return result;
  }
  const large = nom_unsigned_sixteen_bytes(bytes, Endian.Le);
  if (large instanceof Error) {
    console.error(`Failed to nom bytes: ${large.message}`);
    return large;
  }

  result = nom_signed_eight_bytes(bytes, Endian.Le);
  if (result instanceof Error) {
    console.error(`Failed to nom bytes: ${result.message}`);
    return result;
  }
  result = nom_signed_four_bytes(bytes, Endian.Le);
  if (result instanceof Error) {
    console.error(`Failed to nom bytes: ${result.message}`);
    return result;
  }
  result = nom_signed_two_bytes(bytes, Endian.Le);
  if (result instanceof Error) {
    console.error(`Failed to nom bytes: ${result.message}`);
    return result;
  }
  //console.log(result.value);
}

main();
