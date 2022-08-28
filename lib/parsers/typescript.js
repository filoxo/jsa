const { promises: fs } = require('node:fs');
const ts = require('typescript');

// this guide was where I got started with ts ASTs
// https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#traversing-the-ast-with-a-little-linter
//
// fun fact: typescript does not have a serializable AST https://github.com/microsoft/TypeScript/issues/33502
// so instead use the `createPrinter` api https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#re-printing-sections-of-a-typescript-file
//
// TODO: implement when I figure out a good way to expose all of the ts helpers, which are pretty esoteric.
//
// TODO: assuming that it will be more expensive to create individual TS compiler instances per worker,
// move the createProgram into index.js and share across them
async function parseWithTypescript({ file }) {
  const fileBlob = await fs.readFile(file, { encoding: 'utf-8' });
  const tsconfig = { allowJs: true };
  const { getSourceFile } = ts.createProgram([fileBlob], tsconfig);
  const ast = getSourceFile(file);
  return ast;
}

module.exports = {
  parseWithTypescript,
};
