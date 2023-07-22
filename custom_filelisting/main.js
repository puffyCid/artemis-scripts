// ../../artemis-api/src/filesystem/directory.ts
function readDir(path) {
  const data = fs.readDir(path);
  return data;
}

// main.ts
async function main() {
  const start = "/";
  const files = readDir(start);
  const data = [];
  for await (const entry of files) {
    console.log(`value: ${entry.full_path}`);
    if (typeof entry.inode === "bigint") {
      entry.inode = entry.inode.toString();
    }
    data.push(entry);
  }
  return data;
}
main();
