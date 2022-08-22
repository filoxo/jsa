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

async function analyzeTypeScript(file, tsconfig, analyzerFn) {
  const ast = await parseWithTypescript(file, tsconfig);
  const fileResult = analyzerFn(ast);
  return fileResult;
}

async function analyzeSvelte(file, analyzerFn) {
  const ast = await parseWithSvelte(file);
  const fileResult = analyzerFn(ast);
  return fileResult;
}

workerpool.worker({
  analyzeJavaScript,
  analyzeTypeScript,
  analyzeSvelte,
});
