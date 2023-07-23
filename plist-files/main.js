// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/macos/plist.ts
function getPlist(path) {
  const data = Deno.core.ops.get_plist(path);
  if (data === "") {
    return null;
  }
  const plist_data = JSON.parse(data);
  return plist_data;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/output.ts
function outputResults(data, data_name, output) {
  const output_string = JSON.stringify(output);
  const status = Deno.core.ops.output_results(
    data,
    data_name,
    output_string,
  );
  return status;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/directory.ts
function readDir(path) {
  const data = fs.readDir(path);
  return data;
}

// main.ts
async function main() {
  const start_path = "/Users";
  const plist_files = [];
  await recurse_dir(plist_files, start_path);
  return plist_files;
}
async function recurse_dir(plist_files, start_path) {
  if (plist_files.length > 20) {
    const out = {
      name: "artemis_plist",
      directory: "./tmp",
      format: "json", /* JSON */
      compress: false,
      endpoint_id: "anything-i-want",
      collection_id: 1,
      output: "local", /* LOCAL */
    };
    const status = outputResults(
      JSON.stringify(plist_files),
      "artemis_info",
      out,
    );
    if (!status) {
      console.log("Could not output to local directory");
    }
    plist_files = [];
  }
  for await (const entry of readDir(start_path)) {
    const plist_path = `${start_path}/${entry.filename}`;
    if (entry.is_file && entry.filename.endsWith("plist")) {
      const data = getPlist(plist_path);
      if (data === null) {
        continue;
      }
      const plist_info = {
        plist_content: data,
        file: plist_path,
      };
      plist_files.push(plist_info);
      continue;
    }
    if (entry.is_directory) {
      await recurse_dir(plist_files, plist_path);
    }
  }
}
main();
