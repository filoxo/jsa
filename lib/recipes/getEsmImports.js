const { getNodesByType } = require("./getNodesByType");

/*
Why might you want to get esm imports?

When to use:
*/
function getEsmImports(ast) {
  return getNodesByType(ast, "ImportDeclaration").filter(
    (node) => !node.source.value.startsWith(".") /* is not from local file */
  );
}

module.exports = {
  getEsmImports,
};
