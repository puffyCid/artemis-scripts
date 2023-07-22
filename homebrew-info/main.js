// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/directory.ts
function readDir(path) {
  const data = fs.readDir(path);
  return data;
}

// ../../artemis-api/src/filesystem/files.ts
function stat(path) {
  const data = fs.stat(path);
  return data;
}
function readTextFile(path) {
  const data = fs.readTextFile(path);
  return data;
}

// main.ts
const Homebrew = class {
  constructor() {
    this.desc = /(?<=desc ).*$/m;
    this.homepage_reg = /(?<=homepage ).*$/m;
    this.reg_license = /(?<=license ).*$/m;
    this.reg_url = /(?<=url ).*$/m;
    this.reg_name = /(?<=name ).*$/m;
  }
  readRuby(path) {
    const rubyText = readTextFile(path);
    const descriptoin = rubyText.match(this.desc);
    const receipt = {
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
  readJson(path) {
    const data = readTextFile(path);
    const jsonData = JSON.parse(data);
    const brew = {
      description: jsonData["desc"],
      homepage: jsonData["homepage"],
      url: jsonData["url"],
      license: jsonData["license"],
      caskName: jsonData["name"],
      formulaPath: path,
    };
    return brew;
  }
  readReceipts(path, name, formula) {
    const data = readTextFile(path);
    const jsonData = JSON.parse(data);
    const receipt = {
      installedAsDependency: jsonData["installed_as_dependency"],
      installedOnRequest: jsonData["installed_on_request"],
      installTime: jsonData["time"],
      sourceModified: jsonData["source_modified_time"],
      version: jsonData["source"]["versions"]["stable"],
      formulaPath: jsonData["source"]["path"],
      name,
      description: formula.description,
      homepage: formula.homepage,
      url: formula.url,
      license: formula.license,
      caskName: "N/A",
    };
    return receipt;
  }
};
async function start_drinking(path) {
  const casks = [];
  const entries = readDir(path);
  for await (const entry of entries) {
    if (!entry.is_directory) {
      continue;
    }
    const caskName = `${path}/${entry.filename}/.metadata`;
    const caskData = new Homebrew();
    const entries2 = readDir(caskName);
    for await (const versionEntry of entries2) {
      if (!versionEntry.is_directory) {
        continue;
      }
      const caskName2 =
        `${path}/${entry.filename}/.metadata/${versionEntry.filename}`;
      const entries3 = readDir(caskName2);
      for await (const timeVersion of entries3) {
        if (!versionEntry.is_directory) {
          continue;
        }
        try {
          const formulaPath =
            `${path}/${entry.filename}/.metadata/${versionEntry.filename}/${timeVersion.filename}/Casks/${entry.filename}.rb`;
          const formulaInfo = stat(formulaPath);
          if (formulaInfo.is_file) {
            let receipt = {
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
            let receipt = {
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
async function listCasks() {
  const path = "/usr/local/Caskroom";
  try {
    return await start_drinking(path);
  } catch (_) {
    return await start_drinking("/opt/homebrew/Caskroom");
  }
}
async function start_brewing(path) {
  const brew_receipts = [];
  const entries = readDir(path);
  for await (const entry of entries) {
    if (!entry.is_directory) {
      continue;
    }
    const brew_name = `${path}/${entry.filename}`;
    const brewData = new Homebrew();
    const entries2 = readDir(brew_name);
    for await (const brew_entry of entries2) {
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
async function listReceipts() {
  const path = "/usr/local/Cellar";
  try {
    return await start_brewing(path);
  } catch (_) {
    return await start_brewing("/opt/homebrew/Cellar");
  }
}
async function main() {
  const brew = await listReceipts();
  const casks = await listCasks();
  const homebrew = {
    packages: brew,
    casks,
  };
  return homebrew;
}
main();
