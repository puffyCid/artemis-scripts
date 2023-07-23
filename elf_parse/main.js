// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/linux/elf.ts
function getElf(path) {
  const data = Deno.core.ops.get_elf(path);
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
  for (const entry of readDir(bin_path)) {
    if (!entry.is_file) {
      continue;
    }
    const elf_path = `${bin_path}/${entry.filename}`;
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
