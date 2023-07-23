import { getElf } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { readDir } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";
import { ElfInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/linux/elf.ts";

interface FileMeta {
  path: string;
  elf: ElfInfo;
}
async function main() {
  const bin_path = "/bin";

  const elfs: FileMeta[] = [];
  for await (const entry of readDir(bin_path)) {
    if (!entry.is_file) {
      continue;
    }
    const elf_path = `${bin_path}/${entry.filename}`;
    const info = getElf(elf_path);
    if (info === null) {
      continue;
    }
    const meta: FileMeta = {
      path: elf_path,
      elf: info,
    };
    elfs.push(meta);
  }
  return elfs;
}

main();
