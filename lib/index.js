const glob = require('glob');
const { is } = require('./utils');
const workerpool = require('workerpool');
const { join, sep } = require('node:path');

const pool = workerpool.pool(require.resolve('./ast-worker.js'));

const globAsync = (files) =>
  new Promise((resolve, reject) => {
    glob(files, (err, matches) => {
      if (err) reject(err);
      resolve(matches);
    });
  });

async function jsa({ files, tsconfig }) {
  let filepaths;
  if (is.array(files)) {
    if (!files.every(is.string)) {
      throw new Error(
        'files was given as an array but not every item is a string'
      );
    } else {
      filepaths = files;
    }
  } else if (is.string(files)) {
    const matches = await globAsync(join(process.cwd(), sep, files));
    if (!matches.length) {
      throw new Error(`glob '${files}' did not match any files`);
    } else {
      filepaths = matches;
    }
  } else {
    throw new Error(`files was neither a string or an array of strings.`);
  }

  if (tsconfig) {
    tsconfig = path.resolve(tsconfig);
  }

  const worker = await pool.proxy();
  const results = await Promise.all(
    filepaths.map((filepath) => {
      if (tsconfig) {
        return worker.analyzeTypeScript(filepath, { tsconfig });
      }

      return worker.analyzeJavaScript(filepath);
    })
  );
  const flatResult = results.flat(); // TODO: maybe make configurable? consumers may not always want this, or might be necessary to distinguish stuff.

  worker.terminate();

  return flatResult;
}

module.exports = {
  jsa,
};
