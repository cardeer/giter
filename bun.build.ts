async function build() {
  const result = await Bun.build({
    entrypoints: ["./src/index.ts"],
    outdir: "./dist",
    minify: true,
    format: "esm",
    splitting: true,
    sourcemap: "none",
  });

  if (!result.success) {
    for (const message of result.logs) {
      console.error(message);
    }
  }
}

build();
