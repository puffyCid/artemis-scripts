import { getShellbags } from "https://github.com/puffycid/artemis-api/mod.ts";

/**
 * @returns Array of `Shellbags`
 */
function main() {
  const resolve_guids = true;
  const bags = getShellbags(resolve_guids);
  return bags;
}

main();
