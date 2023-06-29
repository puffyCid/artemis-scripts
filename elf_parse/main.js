// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/linux/elf.ts
function getElf(path) {
  const data = Deno[Deno.internal].core.ops.get_elf(path);
  if (data === "") {
    return null;
  }
  const macho = JSON.parse(data);
  return macho;
}

// main.ts
function main() {
  const bin_path = "/bin";
  const elfs = [];
  for (const entry of Deno.readDirSync(bin_path)) {
    if (!entry.isFile) {
      continue;
    }
    const elf_path = `${bin_path}/${entry.name}`;
    const info = getElf(elf_path);
    if (info === null) {
      continue;
    }
    const meta = {
      path: elf_path,
      elf: info,
    };
    elfs.push(meta);
  }
  return elfs;
}
main();
