// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/directory.ts
function readDir(path) {
  const data = fs.readDir(path);
  return data;
}

// https://raw.githubusercontent.com/puffycid/artemis-api/master/src/filesystem/files.ts
function hash(path, md5, sha1, sha256) {
  const data = fs.hash(path, md5, sha1, sha256);
  return data;
}

// main.ts
async function main() {
  const start = "/";
  const files = readDir(start);
  for await (const entry of files) {
    if (!entry.is_file) {
      continue;
    }
    const hashes = hash(entry.full_path, true, false, false);
    return hashes;
  }
}
main();
