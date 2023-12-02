import {
  Endian,
  nomSignedEightBytes,
  nomSignedFourBytes,
  nomSignedTwoBytes,
  nomUnsignedEightBytes,
  nomUnsignedOneBytes,
  nomUnsignedSixteenBytes,
  nomUnsignedTwoBytes,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/nom/helpers.ts";
import {
  take,
  takeUntil,
  takeWhile,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/nom/parsers.ts";

function main() {
  const result = takeWhile("aaaaacrab!", "a");
  if (result instanceof Error) {
    console.error(`Failed to nom string: ${result}`);
    return result;
  }

  console.log(
    `I nommed: '${result.nommed}'. I have remaining: '${result.remaining}'`,
  );

  const bytes = new Uint8Array([0, 0, 0, 0, 1]);

  const rsultBytes = takeWhile(bytes, 0);
  if (rsultBytes instanceof Error) {
    console.error(`Failed to nom bytes: ${rsultBytes.message}`);
    return result;
  }

  console.log(
    `I nommed bytes: ${rsultBytes.nommed}. String remaining (via bytes to string): ${rsultBytes.remaining}`,
  );

  let test = "a,simple,csv,string";
  while (test.includes(",")) {
    const result = takeUntil(test, ",");
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
  const resultBytes = takeUntil(bytes2, stop);
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
  let result = nomUnsignedOneBytes(bytes, Endian.Le);
  if (result instanceof Error) {
    console.error(`Failed to nom bytes: ${result.message}`);
    return result;
  }

  result = nomUnsignedTwoBytes(bytes, Endian.Le);
  if (result instanceof Error) {
    console.error(`Failed to nom bytes: ${result.message}`);
    return result;
  }
  result = nomSignedFourBytes(bytes, Endian.Le);
  if (result instanceof Error) {
    console.error(`Failed to nom bytes: ${result.message}`);
    return result;
  }
  result = nomUnsignedEightBytes(bytes, Endian.Le);
  if (result instanceof Error) {
    console.error(`Failed to nom bytes: ${result.message}`);
    return result;
  }
  const large = nomUnsignedSixteenBytes(bytes, Endian.Le);
  if (large instanceof Error) {
    console.error(`Failed to nom bytes: ${large.message}`);
    return large;
  }

  result = nomSignedEightBytes(bytes, Endian.Le);
  if (result instanceof Error) {
    console.error(`Failed to nom bytes: ${result.message}`);
    return result;
  }
  result = nomSignedFourBytes(bytes, Endian.Le);
  if (result instanceof Error) {
    console.error(`Failed to nom bytes: ${result.message}`);
    return result;
  }
  result = nomSignedTwoBytes(bytes, Endian.Le);
  if (result instanceof Error) {
    console.error(`Failed to nom bytes: ${result.message}`);
    return result;
  }
  //console.log(result.value);
}

main();
