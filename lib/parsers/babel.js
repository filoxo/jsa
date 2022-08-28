const { promises: fs } = require('node:fs');
const { basename } = require('node:path');
const { parseAsync, loadPartialConfig } = require('@babel/core');

async function parseWithBabel(file) {
  const filename = basename(file);
  // TODO: implement resolving user's config
  const { options: partialOptions } = loadPartialConfig({
    filename,
    // TODO: see if presets can be passed in here and have them resolve locally to the project
    // presets: [
    //   '@babel/preset-env',
    //   '@babel/preset-react',
    //   '@babel/preset-typescript',
    // ],
  });
  const options = {
    ...partialOptions,
    presets: [
      require.resolve('@babel/preset-env'),
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-typescript'),
    ],
  };
  const fileBlob = await fs.readFile(file, { encoding: 'utf-8' });
  const ast = await parseAsync(fileBlob, options);
  return ast;
}

module.exports = {
  parseWithBabel,
};
