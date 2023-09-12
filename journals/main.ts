import { getJournal } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";
import { readDir } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/mod.ts";
import {
  Format,
  Output,
  outputResults,
  OutputType,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/src/system/output.ts";

async function main() {
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
  const result = await readDir(journals);
  if (result instanceof Error) {
    return;
  }
  for (const entry of result) {
    if (!entry.is_directory) {
      continue;
    }
    const full_path = `${journals}/${entry.filename}`;

    const path_entry = await readDir(full_path);
    if (path_entry instanceof Error) {
      continue;
    }

    for (const files of path_entry) {
      if (!files.filename.endsWith("journal")) {
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
