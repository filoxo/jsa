/*
Why might you want to get package imports?

When to use:

Pitfalls:
-  

TODO: add tests to ensure that it can handle...

import { something } from 'somewhere'
import { something as somethingElse } from 'somewhere'
import type { someType } from 'somewhere'
import * as something from 'somewhere'
import something from 'somewhere'
*/
function getPackageImports(ast, pkgName) {
  return getNodesByType(ast, "ImportDeclaration")
    .filter((node) => node.source.value === pkgName)
    .flatMap((node) =>
      node.specifiers.map(
        (specifier) => specifier.imported?.name || specifier.local?.name
      )
    );
}

module.exports = {
  getPackageImports,
};
