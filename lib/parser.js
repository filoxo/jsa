const { promises: fs } = require('node:fs');
const path = require('node:path');
const { parseAsync, loadPartialConfig } = require('@babel/core');
const { parse } = require('svelte/compiler');

async function parseWithBabel(file) {
  const filename = path.basename(file);
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

async function parseWithSvelte(file) {
  const fileBlob = await fs.readFile(file, { encoding: 'utf-8' });
  const { instance: ast } = parse(fileBlob);
  return ast;
}

async function parseWithTypescript(file, tsconfig) {
  // this guide was super helpful
  // https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#traversing-the-ast-with-a-little-linter
  const ts = requireFromSourceProject('typescript');
  const { getSourceFile } = ts.createProgram([file], tsconfig);
  const ast = getSourceFile(file);
  console.log(ast);
  return ast;
}

module.exports = {
  parseWithBabel,
  parseWithTypescript,
  parseWithSvelte,
};
