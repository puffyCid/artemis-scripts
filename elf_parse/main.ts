import { getElf } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { ElfInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/linux/elf.ts";

interface FileMeta {
  path: string;
  elf: ElfInfo;
}
function main() {
  const bin_path = "/bin";

  const elfs: FileMeta[] = [];
  for (const entry of Deno.readDirSync(bin_path)) {
    if (!entry.isFile) {
      continue;
    }
    const elf_path = `${bin_path}/${entry.name}`;
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
