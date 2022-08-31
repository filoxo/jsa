function getNodesByType(ast, nodeType) {
  const types = Array.isArray(nodeType) ? nodeType : [nodeType];
  return walk.filter(ast, walk.preorder, (value, _key, _parent) =>
    types.includes(value?.type)
  );
}

module.exports = {
  getNodesByType,
};
