import * as esbuild from "https://deno.land/x/esbuild@v0.15.10/mod.js";
import { denoPlugin } from "https://deno.land/x/esbuild_deno_loader@0.6.0/mod.ts";

async function main() {
  const _result = await esbuild.build({
    plugins: [denoPlugin()],
    entryPoints: ["./main.ts"],
    outfile: "main.js",
    bundle: true,
    format: "cjs",
  });

  esbuild.stop();
}

main();
