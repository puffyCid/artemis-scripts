# Run deno on all artemis scripts and JS files
# Used by CI to generate the JS scripts in releases
# FYI The build.ts strips comments from the bundled JS code
for entry in */
do
cd $entry
deno run -A build.ts
cd ..
done
zip -j scripts.zip ./*/*.js