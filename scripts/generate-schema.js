import { parseArgs } from 'util';
import { mkdir, rm, stat } from 'fs/promises';
import { join } from 'path';

import chalk from 'chalk';
import degit from 'degit';
import { $ } from 'zx';

import { argv } from 'bun';

const { values } = parseArgs({
  args: argv,
  options: {
    output: {
      type: 'string',
      short: 'o',
      description: 'File path to write the generated schema to',
    },
  },
  strict: true,
  allowPositionals: true,
});

const schema = values.output || join('src', 'schema.d.ts');
const openAPIDefinitionsDirectory = './tmp/api';
const openApiDefinitions = join(openAPIDefinitionsDirectory, 'openapi', 'openapiv3.yaml');

const directoryExists = await stat(openAPIDefinitionsDirectory)
  .then(() => true)
  .catch(() => false);

if (directoryExists) {
  await rm(openAPIDefinitionsDirectory, { recursive: true });
}

await mkdir(openAPIDefinitionsDirectory, { recursive: true });

const emitter = degit('temporalio/api', {
  cache: false,
  force: true,
  verbose: true,
});

emitter.on('warn', (warning) => {
  console.warn(chalk.bgYellow(' WARN '), warning.message);
});

emitter.on('error', (error) => {
  console.error(chalk.bgRed(' ERROR '), error.message);
});

await emitter.clone(openAPIDefinitionsDirectory);

await $`npx openapi-typescript ${openApiDefinitions} -o ${schema}`.quiet();
await $`npm run format -- --log-level=error`.quiet();

console.log(chalk.green('Schema generated successfully:'), chalk.blue(schema));
