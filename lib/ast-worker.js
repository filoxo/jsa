const workerpool = require('workerpool');
const {
  parseWithBabel,
  parseWithSvelte,
  parseWithTypescript,
} = require('./parser');

async function analyzeJavaScript(file, analyzerFn) {
  const ast = await parseWithBabel(file);
  const fileResult = analyzerFn(ast);
  return fileResult;
}

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
