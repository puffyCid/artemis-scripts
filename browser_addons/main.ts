import { chromiumExtensions } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/applications/chromium.ts";
import { firefoxAddons } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/applications/firefox.ts";
import { PlatformType } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/systeminfo.ts";

interface BrowserExtensions {
  firefox: [];
  chromium: [];
}

function main() {
  const addons = firefoxAddons(PlatformType.Darwin) as [];
  const extensions = chromiumExtensions(PlatformType.Darwin) as [];

  const browse: BrowserExtensions = {
    firefox: addons,
    chromium: extensions,
  };
  return browse;
}
main();
