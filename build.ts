const result = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'node',
  sourcemap: 'linked',
  packages: 'external',
});

await Bun.$`bunx tsc src/index.ts -d --outfile dist/index.d.ts --emitDeclarationOnly --module esnext --skipLibCheck`;

console.log(result);

export {};
