import { getElf } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { readDir } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";
import { LinuxError } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/linux/errors.ts";
import { ElfInfo } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/types/linux/elf.d.ts";

interface FileMeta {
  path: string;
  elf: ElfInfo;
}
async function main() {
  const bin_path = "/bin";

  const elfs: FileMeta[] = [];
  const result = await readDir(bin_path);
  if (result instanceof Error) {
    return;
  }
  for (const entry of result) {
    if (!entry.is_file) {
      continue;
    }
    const elf_path = `${bin_path}/${entry.filename}`;
    const info = getElf(elf_path);
    if (info instanceof LinuxError) {
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
