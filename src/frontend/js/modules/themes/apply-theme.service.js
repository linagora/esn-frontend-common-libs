const hexToHsl = require('hex-to-hsl');

angular.module('esn.themes').factory('applyThemeService', applyThemeService);

// TODO (esn-frontend-common-libs#51): Write tests for this module
function applyThemeService() {
  return {
    applyTheme
  };

  function applyTheme(theme) {
    const THEME_STYLE_ID = 'op-current-theme';
    const themeNode = document.createTextNode(_convertThemeToCSS(theme));
    let style = document.getElementById(THEME_STYLE_ID);

    if (style) return style.replaceChild(themeNode, style.firstChild);

    style = document.createElement('style');
    style.appendChild(themeNode);
    style.id = THEME_STYLE_ID;
    document.head.appendChild(style);
  }

  function _camelToKebabCase(text) {
    return text.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
  }

  function _convertThemeToCSS(theme) {
    return `
      :root {
        ${Object.keys(theme.colors).map(color => {
    const [h, s, l] = hexToHsl(theme.colors[color]);

    return `
            --${_camelToKebabCase(color)}-h: ${h};
            --${_camelToKebabCase(color)}-s: ${s}%;
            --${_camelToKebabCase(color)}-l: ${l}%;
          `;
  }).join('')}
      }
    `;
  }
}
