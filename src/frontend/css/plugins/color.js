const colorFunctions = require('less/lib/less/functions/color').default;

const SUPPORTED_COLOR_FUNCTIONS = {
  LIGHTEN: 'lighten',
  DARKEN: 'darken',
  FADE: 'fade'
};

// TODO (esn-frontend-common-libs#51): Write tests for this plugin
function colorFunctionInterceptor(color, amount, method, functionName) {
  if (!Object.values(SUPPORTED_COLOR_FUNCTIONS).includes(functionName)) {
    throw new Error(`The LESS's color function '${functionName}' is not supported with CSS Variables`);
  }

  // If the "color" argument is a known, concrete color, not a CSS Variable, we'll just use the default LESS function.
  if (color.toHSL) return colorFunctions[functionName](color, amount, method);

  // If the "color" argument is not a transformed one, we'll first transform it here.
  if (color.args) return _firstTransform();

  // Else, if the current "color" argument has already been transformed at least once, its value will be just a string.
  // e.g. hsl(var(--primary-color-h), var(--primary-color-s), calc(var(--primary-color-l) + 20%)). Therefore we need to process it as a string.
  return _nthTransform();

  function _firstTransform() {
    const h = color.args[0].args[0].value;
    const s = color.args[1].args[0].value;
    const l = color.args[2].args[0].value;

    if (functionName === SUPPORTED_COLOR_FUNCTIONS.FADE) {
      return `hsla(var(${h}), var(${s}), calc(var(${l})), ${amount.value}%)`
    }

    if (functionName === SUPPORTED_COLOR_FUNCTIONS.LIGHTEN || functionName === SUPPORTED_COLOR_FUNCTIONS.DARKEN) {
      const sign = functionName === SUPPORTED_COLOR_FUNCTIONS.LIGHTEN ? '+' : '-';

      return `hsla(var(${h}), var(${s}), calc(var(${l}) ${sign} ${amount.value}%), 100%)`;
    }
  }

  function _nthTransform() {
    const lastCommaIndex = color.value.lastIndexOf(',');

    if (functionName === SUPPORTED_COLOR_FUNCTIONS.FADE) { 
      return color.value.substring(0, lastCommaIndex + 2) + `${amount.value}%)`;
    }

    const secondCommaIndex = color.value.indexOf(',', color.value.indexOf(',') + 1);
    const restOfColorString = color.value.substring(lastCommaIndex - 1);

    return color.value.substring(0, secondCommaIndex) + color.value.substring(secondCommaIndex, lastCommaIndex - 1) + ` + ${amount.value}%)` + restOfColorString;
  }
}

module.exports = {
  install: function (less, pluginManager, functions) {
    functions.add(SUPPORTED_COLOR_FUNCTIONS.LIGHTEN, function (color, amount, method) {
      return colorFunctionInterceptor(color, amount, method, SUPPORTED_COLOR_FUNCTIONS.LIGHTEN);
    });

    functions.add(SUPPORTED_COLOR_FUNCTIONS.DARKEN, function (color, amount, method) {
      return colorFunctionInterceptor(color, amount, method, SUPPORTED_COLOR_FUNCTIONS.DARKEN);
    });

    functions.add(SUPPORTED_COLOR_FUNCTIONS.FADE, function (color, amount, method) {
      return colorFunctionInterceptor(color, amount, method, SUPPORTED_COLOR_FUNCTIONS.FADE);
    })
  }
};
