# Artemis Scripts

A collection of useful scripts for
[artemis](https://github.com/puffycid/artemis).

The online documentation at [TODO]() provides in depth information on how to
create and execute scripts.

## Questions or Issues

Feel free to open an issue!

## Contributing or ideas

Pull requests or issues are encouraged!

## Quick Guide

In order to execute scripts you must bundle and compile your TypeScript code
into one (1) JavaScript file.\
Then you will need to base64 encode your JavaScript code and copy that into your
artemis collection.

An example of a simple script that parses macOS plist files using
[artemis](https://github.com/puffycid/artemis).

```toml
system = "macos"

[output]
name = "plist_data"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "script"
[artifacts.script]
name = "all_users_plist_files"
# Parses all plist files in /Users/%
script = "ZnVuY3Rpb24gZ2V0X3BsaXN0KHBhdGgpIHsKICAgIGNvbnN0IGRhdGEgPSBEZW5vLmNvcmUub3BzLmdldF9wbGlzdChwYXRoKTsKICAgIGlmIChkYXRhID09PSAiIikgewogICAgICAgIHJldHVybiB7CiAgICAgICAgICAgICJwbGlzdF9lcnJvciI6IGBmYWlsZWQgdG8gcGFyc2UgcGxpc3QgYXQgcGF0aDogJHtwYXRofWAKICAgICAgICB9OwogICAgfQogICAgY29uc3QgbG9nX2RhdGEgPSBKU09OLnBhcnNlKGRhdGEpOwogICAgcmV0dXJuIGxvZ19kYXRhOwp9CmZ1bmN0aW9uIGdldFBsaXN0KHBhdGgpIHsKICAgIHJldHVybiBnZXRfcGxpc3QocGF0aCk7Cn0KZnVuY3Rpb24gbWFpbigpIHsKICAgIGNvbnN0IHN0YXJ0X3BhdGggPSAiL1VzZXJzIjsKICAgIGNvbnN0IHBsaXN0X2ZpbGVzID0gW107CiAgICByZWN1cnNlX2RpcihwbGlzdF9maWxlcywgc3RhcnRfcGF0aCk7CiAgICByZXR1cm4gcGxpc3RfZmlsZXM7Cn0KZnVuY3Rpb24gcmVjdXJzZV9kaXIocGxpc3RfZmlsZXMsIHN0YXJ0X3BhdGgpIHsKICAgIGZvciAoY29uc3QgZW50cnkgb2YgRGVuby5yZWFkRGlyU3luYyhzdGFydF9wYXRoKSl7CiAgICAgICAgY29uc3QgcGxpc3RfcGF0aCA9IGAke3N0YXJ0X3BhdGh9LyR7ZW50cnkubmFtZX1gOwogICAgICAgIGlmIChlbnRyeS5pc0ZpbGUgJiYgZW50cnkubmFtZS5lbmRzV2l0aCgiLnBsaXN0IikpIHsKICAgICAgICAgICAgY29uc3QgZGF0YSA9IGdldFBsaXN0KHBsaXN0X3BhdGgpOwogICAgICAgICAgICBjb25zdCBwbGlzdF9pbmZvID0gewogICAgICAgICAgICAgICAgcGxpc3RfY29udGVudDogZGF0YSwKICAgICAgICAgICAgICAgIGZpbGU6IHBsaXN0X3BhdGgKICAgICAgICAgICAgfTsKICAgICAgICAgICAgcGxpc3RfZmlsZXMucHVzaChwbGlzdF9pbmZvKTsKICAgICAgICAgICAgY29udGludWU7CiAgICAgICAgfQogICAgICAgIGlmIChlbnRyeS5pc0RpcmVjdG9yeSkgewogICAgICAgICAgICByZWN1cnNlX2RpcihwbGlzdF9maWxlcywgcGxpc3RfcGF0aCk7CiAgICAgICAgfQogICAgfQp9Cm1haW4oKTs="
```

An example of a simple filter script to filter out a macOS filelisting to only
return Info.plist files using [artemis](https://github.com/puffycid/artemis).

```toml
system = "macos"

[output]
name = "info_plist_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"
filter_name = "apps_info_plists"
# This script will take the files artifact below and filter it to only return Info.plist files
# We could expand this even further by then using the plist parser on the Info.plist path and include that parsed data too
filter_script = "Ly8gZGVuby1mbXQtaWdub3JlLWZpbGUKLy8gZGVuby1saW50LWlnbm9yZS1maWxlCi8vIFRoaXMgY29kZSB3YXMgYnVuZGxlZCB1c2luZyBgZGVubyBidW5kbGVgIGFuZCBpdCdzIG5vdCByZWNvbW1lbmRlZCB0byBlZGl0IGl0IG1hbnVhbGx5CgpmdW5jdGlvbiBtYWluKCkgewogICAgY29uc3QgYXJncyA9IERlbm8uYXJnczsKICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkgewogICAgICAgIHJldHVybiBbXTsKICAgIH0KICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGFyZ3NbMF0pOwogICAgY29uc3QgZmlsdGVyX2ZpbGVzID0gW107CiAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGRhdGEpewogICAgICAgIGlmIChlbnRyeS5maWxlbmFtZSA9PT0gIkluZm8ucGxpc3QiKSB7CiAgICAgICAgICAgIGZpbHRlcl9maWxlcy5wdXNoKGVudHJ5KTsKICAgICAgICB9CiAgICB9CiAgICByZXR1cm4gZmlsdGVyX2ZpbGVzOwp9Cm1haW4oKTsKCg=="

[[artifacts]]
artifact_name = "files" # Name of artifact
filter = true
[artifacts.files]
start_path = "/System/Volumes/Data/Applications" # Start of file listing
depth = 100 # How many sub directories to descend
metadata = false # Get executable metadata
md5 = false # MD5 all files
sha1 = false # SHA1 all files
sha256 = false # SHA256 all files
path_regex = "" # Regex for paths
file_regex = "" # Regex for files
```
