// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/macho.ts
function getMacho(path) {
  const data = Deno.core.ops.get_macho(path);
  if (data === "") {
    return null;
  }
  const macho = JSON.parse(data);
  return macho;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/directory.ts
function readDir(path) {
  const data = fs.readDir(path);
  return data;
}

// main.ts
async function main() {
  const bin_path = "/bin";
  const machos = [];
  for await (const entry of readDir(bin_path)) {
    if (!entry.is_file) {
      continue;
    }
    const macho_path = `${bin_path}/${entry.filename}`;
    const info = getMacho(macho_path);
    if (info === null) {
      continue;
    }
    const meta = {
      path: macho_path,
      macho: info,
    };
    machos.push(meta);
  }
  return machos;
}
main();
