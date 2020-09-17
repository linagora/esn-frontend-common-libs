/* eslint-disable class-methods-use-this */

class AllowMutateEsmExports {
  apply(compiler) {
    compiler.hooks.compilation.tap('AllowMutateEsmExports', function(compilation) {
      compilation.mainTemplate.hooks.requireExtensions.tap('AllowMutateEsmExports', source => source.replace(
        'Object.defineProperty(exports, name, { enumerable: true, get: getter });',
        'Object.defineProperty(exports, name, { enumerable: true, get: getter, configurable: true });'
      ));
    });
  }
}

module.exports = AllowMutateEsmExports;
