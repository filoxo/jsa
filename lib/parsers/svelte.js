const { promises: fs } = require('node:fs');

async function parseWithSvelte(file) {
  const fileBlob = await fs.readFile(file, { encoding: 'utf-8' });
  const { instance: ast } = parse(fileBlob);
  return ast;
}

module.exports = {
  parseWithSvelte,
};
