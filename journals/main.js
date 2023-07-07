// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/linux/journal.ts
function getJournal(path) {
  const data = Deno[Deno.internal].core.ops.get_journal(path);
  if (data === "") {
    return null;
  }
  const journal = JSON.parse(data);
  return journal;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/output.ts
function outputResults(data, data_name, output) {
  const output_string = JSON.stringify(output);
  const status = Deno[Deno.internal].core.ops.output_results(
    data,
    data_name,
    output_string
  );
  return status;
}

// main.ts
function main() {
  const journals = "/var/log/journal";
  const out = {
    name: "deno_journals",
    directory: "./tmp",
    format: "json" /* JSON */,
    compress: false,
    endpoint_id: "anything-i-want",
    collection_id: 1,
    output: "local" /* LOCAL */
  };
  for (const entry of Deno.readDirSync(journals)) {
    if (!entry.isDirectory) {
      continue;
    }
    const full_path = `${journals}/${entry.name}`;
    for (const files of Deno.readDirSync(full_path)) {
      if (!files.name.endsWith("journal")) {
        continue;
      }
      const journal_file = `${full_path}/${files.name}`;
      const data = getJournal(journal_file);
      const status = outputResults(JSON.stringify(data), "journal", out);
      if (!status) {
        console.log("Could not output to local directory");
      }
    }
  }
}
main();
