const workerpool = require('workerpool');
const { parseWithSvelte, parseWithTypescript } = require('./parser');
const { parseWithBabel } = require('./parsers/babel');

const glue = function (parseWith) {
  return async function analyze(file, analyzerFn) {
    const ast = await parseWith(file);
    const fileResult = analyzerFn(ast);
    return fileResult;
  };
};

const analyzeJavaScript = glue(parseWithBabel);

async function analyzeTypeScript(file, analyzerFn) {
  const ast = await parseWithTypescript(file);
  const fileResult = analyzerFn(ast);
  return fileResult;
}

async function analyzeSvelte(file, analyzerFn) {
  const ast = await parseWithSvelte(file);
  const fileResult = analyzerFn(ast);
  return fileResult;
}

if (process.env.VITEST) {
  module.exports = {
    analyzeJavaScript,
    analyzeTypeScript,
    analyzeSvelte,
  };
} else {
  workerpool.worker({
    analyzeJavaScript,
    analyzeTypeScript,
    analyzeSvelte,
  });
}
