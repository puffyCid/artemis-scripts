import {
  readDir,
  readTextFile,
  stat,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";

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
    const rubyText = readTextFile(path);
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
   * Parse a JSON file associated with Cask
   * @param path Path to cask json file
   * @returns `HomebrewFormula`
   */
  public readJson(path: string): HomebrewFormula {
    const data = readTextFile(path);
    const jsonData = JSON.parse(data);
    const brew: HomebrewFormula = {
      description: jsonData["desc"],
      homepage: jsonData["homepage"],
      url: jsonData["url"],
      license: jsonData["license"],
      caskName: jsonData["name"],
      formulaPath: path,
    };

    return brew;
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
    const data = readTextFile(path);
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

async function start_drinking(path: string): Promise<Array<HomebrewFormula>> {
  const casks: Array<HomebrewFormula> = [];
  const entries = readDir(path);
  for await (const entry of entries) {
    if (!entry.is_directory) {
      continue;
    }

    const caskName = `${path}/${entry.filename}/.metadata`;
    const caskData = new Homebrew();

    const entries = readDir(caskName);
    for await (const versionEntry of entries) {
      if (!versionEntry.is_directory) {
        continue;
      }
      const caskName =
        `${path}/${entry.filename}/.metadata/${versionEntry.filename}`;

      const entries = readDir(caskName);
      for await (const timeVersion of entries) {
        if (!versionEntry.is_directory) {
          continue;
        }
        try {
          const formulaPath =
            `${path}/${entry.filename}/.metadata/${versionEntry.filename}/${timeVersion.filename}/Casks/${entry.filename}.rb`;
          const formulaInfo = stat(formulaPath);
          if (formulaInfo.is_file) {
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
            `${path}/${entry.filename}/.metadata/${versionEntry.filename}/${timeVersion.filename}/Casks/${entry.filename}.json`;
          const formulaInfo = stat(formulaPath);
          if (formulaInfo.is_file) {
            let receipt: HomebrewFormula = {
              description: "",
              homepage: "",
              url: "",
              license: "",
              caskName: "",
              formulaPath,
            };
            receipt = caskData.readJson(formulaPath);
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
async function listCasks(): Promise<Array<HomebrewFormula>> {
  const path = "/usr/local/Caskroom";
  try {
    return await start_drinking(path);
  } catch (_) {
    return await start_drinking("/opt/homebrew/Caskroom");
  }
}

async function start_brewing(path: string): Promise<HomebrewReceipt[]> {
  const brew_receipts: Array<HomebrewReceipt> = [];

  const entries = readDir(path);
  for await (const entry of entries) {
    if (!entry.is_directory) {
      continue;
    }
    const brew_name = `${path}/${entry.filename}`;
    const brewData = new Homebrew();
    const entries = readDir(brew_name);
    for await (const brew_entry of entries) {
      if (!brew_entry.is_directory) {
        continue;
      }

      const receiptPath =
        `${path}/${entry.filename}/${brew_entry.filename}/INSTALL_RECEIPT.json`;
      const formulaPath =
        `${path}/${entry.filename}/${brew_entry.filename}/.brew/${entry.filename}.rb`;

      const receipt_info = stat(receiptPath);
      if (!receipt_info.is_file) {
        continue;
      }
      const formulaInfo = stat(formulaPath);
      if (!formulaInfo.is_file) {
        continue;
      }
      const formula = brewData.readRuby(formulaPath);
      const receipt = brewData.readReceipts(
        receiptPath,
        entry.filename,
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
async function listReceipts(): Promise<HomebrewReceipt[]> {
  const path = "/usr/local/Cellar";
  try {
    return await start_brewing(path);
  } catch (_) {
    return await start_brewing("/opt/homebrew/Cellar");
  }
}

/**
 * Entry function for `Deno`!
 * Parses Homebrew info without using any `Artemis` functions
 */
async function main(): Promise<HomebrewData> {
  const brew = await listReceipts();
  const casks = await listCasks();
  const homebrew: HomebrewData = {
    packages: brew,
    casks: casks,
  };
  return homebrew;
}

main();
