// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/linux/journal.ts
function getJournal(path) {
  const data = Deno.core.ops.get_journal(path);
  if (data === "") {
    return null;
  }
  const journal = JSON.parse(data);
  return journal;
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

// main.ts
function main() {
  const journals = "/var/log/journal";
  const out = {
    name: "deno_journals",
    directory: "./tmp",
    format: "json", /* JSON */
    compress: false,
    endpoint_id: "anything-i-want",
    collection_id: 1,
    output: "local", /* LOCAL */
  };
  for (const entry of readDir(journals)) {
    if (!entry.is_directory) {
      continue;
    }
    const full_path = `${journals}/${entry.filename}`;
    for (const files of readDir(full_path)) {
      if (!files.name.endsWith("journal")) {
        continue;
      }
      const journal_file = `${full_path}/${files.filename}`;
      const data = getJournal(journal_file);
      const status = outputResults(JSON.stringify(data), "journal", out);
      if (!status) {
        console.log("Could not output to local directory");
      }
    }
  }
}
main();
