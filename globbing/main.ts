import { glob } from "https://raw.githubusercontent.com/puffycid/artemis-api/main/src/filesystem/mod.ts";
import { readXml } from "https://raw.githubusercontent.com/puffycid/artemis-api/main/src/encoding/mod.ts";

function main() {
  const paths = glob("C:\\*\\*.xml");
  if (paths instanceof Error) {
    console.error(`Failed to glob path: ${paths}`);
    return paths;
  }

  for (const entry of paths) {
    if (!entry.is_file) {
      continue;
    }

    const reuslt = readXml(entry.full_path);
    return reuslt;
  }
}

main();
