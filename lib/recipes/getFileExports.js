/*
Why might you want to get file exports?

When to use:
- to understand the top level api of a package/microfrontend

Pitfalls:
- non-exported code is not always dead code! It could be used internally within the package itself.

TODO: add tests to ensure it can handle...

export default something;
export something;
export { something } from 'somewhere-else'
export { something as somethingElse } from 'somewhere-else'
export type someType; 
*/
function getExports(ast) {
  return getNodesByType(ast, [
    "ExportSpecifier",
    "ExportNamespaceSpecifier",
  ]).map((specifier) => {
    return specifier.exported?.name || specifier.local?.name;
  });
}
