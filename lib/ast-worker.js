const workerpool = require('workerpool');
const { parseWithBabel } = require('./parsers/babel');
const { parseWithSvelte } = require('./parsers/svelte');
// const { parseWithTypescript } = require('./parsers/typescript');

const glue = function (parseWith) {
  return async function analyze(file, analyzerFn) {
    const ast = await parseWith(file);
    const fileResult = analyzerFn(ast);
    return fileResult;
  };
};

// async function analyzeTypeScript(file, analyzerFn) {
//   const ast = await parseWithTypescript(file);
//   const fileResult = analyzerFn(ast);
//   return fileResult;
// }

const methods = {
  analyzeJavaScript: glue(parseWithBabel),
  analyzeSvelte: glue(parseWithSvelte),
  // analyzeTypeScript
};

if (process.env.VITEST) {
  module.exports = methods;
} else {
  workerpool.worker(methods);
}
