// ../../artemis-api/src/filesystem/files.ts
function stat(path) {
  const data = fs.stat(path);
  return data;
}

// main.ts
function main() {
  const target = "/Users";
  const data = stat(target);
  return data;
}
main();
