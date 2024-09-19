import { argv } from 'bun';
import { parseArgs } from 'util';

const { values } = parseArgs({
  args: argv,
  options: {
    schema: {
      type: 'string',
      short: 's',
      description: 'The location of the generated schema file',
    },
    output: {
      type: 'string',
      short: 'o',
      description: 'The location of the generated client output',
    },
  },
  strict: true,
  allowPositionals: true,
});

export const schemaInputPath = values.schema || 'src/schema.d.ts';
export const clientOutputPath = values.output || 'src/client.ts';
