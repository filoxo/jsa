const glob = require("glob");
const { is } = require("./utils");
const workerpool = require("workerpool");
const { join, sep } = require("node:path");
const { extname } = require("node:path");
const { getNodesByType } = require("./recipes/getNodesByType");

const pool = workerpool.pool(require.resolve("./ast-worker.js"));

const globAsync = (files) =>
  new Promise((resolve, reject) => {
    glob(files, (err, matches) => {
      if (err) reject(err);
      resolve(matches);
    });
  });

async function jsa({ files, onFileProcess, onComplete }) {
  let filepaths;
  if (is.array(files)) {
    if (!files.every(is.string)) {
      throw new Error(
        "files was given as an array but not every item is a string"
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

  const worker = await pool.proxy();
  const results = await Promise.all(
    filepaths.map((filepath) => {
      switch (extname(filepath)) {
        case ".js":
        case ".jsx":
          return worker.analyzeJavaScript(filepath, onFileProcess);

        case ".ts":
        case ".tsx":
          return worker.analyzeTypeScript(filepath, onFileProcess);

        case ".svelte":
          return worker.analyzeSvelte(filepath, onFileProcess);

        default:
          console.warn(
            `${filepath} is an unsupported filetype and results will be null.`
          );
          return Promise.resolve(null);
      }
    })
  );

  worker.terminate();

  const completedResults = onComplete ? onComplete(results) : results.flat();

  return completedResults;
}

module.exports = {
  jsa,
  helper: {
    getNodesByType,
  },
};
