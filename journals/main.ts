import { getJournal } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import {
  Format,
  Output,
  outputResults,
  OutputType,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/output.ts";

function main() {
  const journals = "/var/log/journal";
  const out: Output = {
    name: "deno_journals",
    directory: "./tmp",
    format: Format.JSON,
    compress: false,
    endpoint_id: "anything-i-want",
    collection_id: 1,
    output: OutputType.LOCAL,
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
