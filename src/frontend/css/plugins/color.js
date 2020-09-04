const defaultColorFunctions = require('less/lib/less/functions/color').default;

const SUPPORTED_COLOR_FUNCTIONS = {
  LIGHTEN: 'lighten',
  DARKEN: 'darken',
  FADE: 'fade'
};

// TODO (esn-frontend-common-libs#51): Write tests for this plugin
/**
 * A function that intercepts the default color functions of LESS so that they can work with CSS Variables.
 * We mainly care about the "color" object. There are three possible cases based on the properties of the "color" object:
 *   1. If "color.toHSL" exists, the "color" object refers to a known, concrete color value, not a CSS Variable.
 *      For this case, we'll just use the default LESS' color functions.
 *   2. Else, the "color" object refers to a color value that is defined by one or a set of CSS Variables.
 *      If "color.args" exists, the "color" object has not been transformed, so the first transformation will be done.
 *   3. Else, if "color.args" doesn't exist, it means that the "color" object refers to a color value that has already
 *      been transformed at least once, and so, the color value will be just a string.
 *      e.g. hsl(var(--primary-color-h), var(--primary-color-s), calc(var(--primary-color-l) + 20%)).
 *      Therefore we need to process it as a string.
 *
 * @param {Object} color The object that contains all the properties related to the color parsed by LESS.
 * @returns {Object|string} A transformed color value that works with CSS Variables.
 */
function colorFunctionInterceptor({
  color, amount, method, functionName
}) {
  if (!Object.values(SUPPORTED_COLOR_FUNCTIONS).includes(functionName)) {
    throw new Error(`The LESS's color function '${functionName}' is not supported with CSS Variables`);
  }

  if (color.toHSL) return defaultColorFunctions[functionName](color, amount, method);

  if (color.args) return _firstTransform();

  return _nthTransform();

  function _firstTransform() {
    const h = color.args[0].args[0].value;
    const s = color.args[1].args[0].value;
    const l = color.args[2].args[0].value;

    if (functionName === SUPPORTED_COLOR_FUNCTIONS.FADE) {
      return `hsla(var(${h}), var(${s}), calc(var(${l})), ${amount.value}%)`;
    }

    if (functionName === SUPPORTED_COLOR_FUNCTIONS.LIGHTEN) {
      return `hsla(var(${h}), var(${s}), calc(var(${l}) + ${amount.value}%), 100%)`;
    }

    if (functionName === SUPPORTED_COLOR_FUNCTIONS.DARKEN) {
      return `hsla(var(${h}), var(${s}), calc(var(${l}) - ${amount.value}%), 100%)`;
    }
  }

  function _nthTransform() {
    const lastCommaIndex = color.value.lastIndexOf(',');

    if (functionName === SUPPORTED_COLOR_FUNCTIONS.FADE) {
      return color.value.substring(0, lastCommaIndex + 2) + `${amount.value}%)`;
    }

    const secondCommaIndex = color.value.indexOf(',', color.value.indexOf(',') + 1);
    const restOfColorString = color.value.substring(lastCommaIndex - 1);

    return color.value.substring(0, secondCommaIndex) + color.value.substring(secondCommaIndex, lastCommaIndex - 1) + ` + ${amount.value}%` + restOfColorString;
  }
}

module.exports = {
  install: function(less, pluginManager, functions) {
    functions.add(SUPPORTED_COLOR_FUNCTIONS.LIGHTEN, function(color, amount, method) {
      return colorFunctionInterceptor({
        color, amount, method, functionName: SUPPORTED_COLOR_FUNCTIONS.LIGHTEN
      });
    });

    functions.add(SUPPORTED_COLOR_FUNCTIONS.DARKEN, function(color, amount, method) {
      return colorFunctionInterceptor({
        color, amount, method, functionName: SUPPORTED_COLOR_FUNCTIONS.DARKEN
      });
    });

    functions.add(SUPPORTED_COLOR_FUNCTIONS.FADE, function(color, amount, method) {
      return colorFunctionInterceptor({
        color, amount, method, functionName: SUPPORTED_COLOR_FUNCTIONS.FADE
      });
    });
  }
};
