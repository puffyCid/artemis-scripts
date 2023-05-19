import { getShellbags } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

/**
 * @returns Array of `Shellbags`
 */
function main() {
  const resolve_guids = true;
  const bags = getShellbags(resolve_guids);
  return bags;
}

main();
