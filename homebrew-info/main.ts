interface HomebrewReceipt extends HomebrewFormula {
  installedAsDependency: boolean;
  installedOnRequest: boolean;
  installTime: number;
  sourceModified: number;
  version: string;
  name: string;
}

interface HomebrewFormula {
  description: string;
  homepage: string;
  url: string;
  license: string;
  caskName: string;
  formulaPath: string;
}

interface HomebrewData {
  packages: HomebrewReceipt[];
  casks: HomebrewFormula[];
}

/**
 * Class used to parse `.rb` and `json` files related to installed `Homebrew` packges
 */
class Homebrew {
  private desc = /(?<=desc ).*$/m;
  private homepage_reg = /(?<=homepage ).*$/m;
  private reg_license = /(?<=license ).*$/m;
  private reg_url = /(?<=url ).*$/m;
  private reg_name = /(?<=name ).*$/m;

  /**
   * @param path Path to formula .rb file to read
   * @param receipt HomebrewReceipt object to modify
   * @returns Updated HomebrewReceipt object
   */
  public readRuby(path: string): HomebrewFormula {
    const rubyText = Deno.readTextFileSync(path);
    const descriptoin = rubyText.match(this.desc);
    const receipt: HomebrewFormula = {
      description: "",
      homepage: "",
      url: "",
      license: "",
      caskName: "",
      formulaPath: path,
    };
    if (typeof descriptoin?.[0] === "string") {
      receipt.description = descriptoin?.[0].replaceAll('"', "");
    }

    const homepage = rubyText.match(this.homepage_reg);
    if (typeof homepage?.[0] === "string") {
      receipt.homepage = homepage?.[0].replaceAll('"', "");
    }

    const license = rubyText.match(this.reg_license);
    if (typeof license?.[0] === "string") {
      receipt.license = license?.[0].replaceAll('"', "");
    }

    const url = rubyText.match(this.reg_url);
    if (typeof url?.[0] === "string") {
      receipt.url = url?.[0].replaceAll('"', "");
    }

    const name = rubyText.match(this.reg_name);
    if (typeof name?.[0] === "string") {
      receipt.caskName = name?.[0].replaceAll('"', "");
    }

    return receipt;
  }

  /**
   * @param path Path to formula INSTALL_RECEIPT.json file to read
   * @param name Homebrew formula name
   * @returns HomebrewReceipt object
   */
  public readReceipts(
    path: string,
    name: string,
    formula: HomebrewFormula,
  ): HomebrewReceipt {
    const data = Deno.readTextFileSync(path);
    const jsonData = JSON.parse(data);
    const receipt: HomebrewReceipt = {
      installedAsDependency: jsonData["installed_as_dependency"],
      installedOnRequest: jsonData["installed_on_request"],
      installTime: jsonData["time"],
      sourceModified: jsonData["source_modified_time"],
      version: jsonData["source"]["versions"]["stable"],
      formulaPath: jsonData["source"]["path"],
      name: name,
      description: formula.description,
      homepage: formula.homepage,
      url: formula.url,
      license: formula.license,
      caskName: "N/A",
    };
    return receipt;
  }
}

function start_drinking(path: string): Array<HomebrewFormula> {
  const casks: Array<HomebrewFormula> = [];

  for (const entry of Deno.readDirSync(path)) {
    if (!entry.isDirectory) {
      continue;
    }

    const caskName = `${path}/${entry.name}/.metadata`;
    const caskData = new Homebrew();

    for (const versionEntry of Deno.readDirSync(caskName)) {
      if (!versionEntry.isDirectory) {
        continue;
      }
      const caskName = `${path}/${entry.name}/.metadata/${versionEntry.name}`;

      for (const timeVersion of Deno.readDirSync(caskName)) {
        if (!versionEntry.isDirectory) {
          continue;
        }
        try {
          const formulaPath =
            `${path}/${entry.name}/.metadata/${versionEntry.name}/${timeVersion.name}/Casks/${entry.name}.rb`;
          const formulaInfo = Deno.lstatSync(formulaPath);
          if (formulaInfo.isFile) {
            let receipt: HomebrewFormula = {
              description: "",
              homepage: "",
              url: "",
              license: "",
              caskName: "",
              formulaPath,
            };
            receipt = caskData.readRuby(formulaPath);
            casks.push(receipt);
          }
        } catch (_e) {
          const formulaPath =
            `${path}/${entry.name}/.metadata/${versionEntry.name}/${timeVersion.name}/Casks/${entry.name}.json`;
          const formulaInfo = Deno.lstatSync(formulaPath);
          if (formulaInfo.isFile) {
            let receipt: HomebrewFormula = {
              description: "",
              homepage: "",
              url: "",
              license: "",
              caskName: "",
              formulaPath,
            };
            receipt = caskData.readRuby(formulaPath);
            casks.push(receipt);
          }
        }
      }
    }
  }
  return casks;
}

/**
 * Get information on all installed `Homebrew Casks`
 */
function listCasks(): Array<HomebrewFormula> {
  const path = "/usr/local/Caskroom";
  try {
    return start_drinking(path);
  } catch (_) {
    return start_drinking("/opt/homebrew/Caskroom");
  }
}

function start_brewing(path: string): Array<HomebrewReceipt> {
  const brew_receipts: Array<HomebrewReceipt> = [];

  for (const entry of Deno.readDirSync(path)) {
    if (!entry.isDirectory) {
      continue;
    }
    const brew_name = `${path}/${entry.name}`;
    const brewData = new Homebrew();
    for (const brew_entry of Deno.readDirSync(brew_name)) {
      if (!brew_entry.isDirectory) {
        continue;
      }

      const receiptPath =
        `${path}/${entry.name}/${brew_entry.name}/INSTALL_RECEIPT.json`;
      const formulaPath =
        `${path}/${entry.name}/${brew_entry.name}/.brew/${entry.name}.rb`;

      const receipt_info = Deno.lstatSync(receiptPath);
      if (!receipt_info.isFile) {
        continue;
      }
      const formulaInfo = Deno.lstatSync(formulaPath);
      if (!formulaInfo.isFile) {
        continue;
      }
      const formula = brewData.readRuby(formulaPath);
      const receipt = brewData.readReceipts(
        receiptPath,
        entry.name,
        formula,
      );

      brew_receipts.push(receipt);
    }
  }
  return brew_receipts;
}

/**
 * Get information on all installed `Homebrew Formulas`
 */
function listReceipts(): Array<HomebrewReceipt> {
  const path = "/usr/local/Cellar";
  try {
    return start_brewing(path);
  } catch (_) {
    return start_brewing("/opt/homebrew/Cellar");
  }
}

/**
 * Entry function for `Deno`!
 * Parses Homebrew info without using any `Artemis` functions
 */
function main(): HomebrewData {
  const brew = listReceipts();
  const casks = listCasks();
  const homebrew: HomebrewData = {
    packages: brew,
    casks: casks,
  };
  return homebrew;
}

main();
