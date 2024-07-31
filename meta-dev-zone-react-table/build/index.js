module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(2);
            var content = __webpack_require__(3);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ":root {\r\n  --table-background-color: #fff;\r\n  --table-text-color: #000;\r\n  --table-hover-color: #0000000a;\r\n  --table-svg-color: #000;\r\n}\r\n\r\nbody,\r\nhtml {\r\n  margin: 0;\r\n  padding: 0;\r\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto,\r\n    Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.table-container-pro {\r\n  overflow-x: auto;\r\n  color: var(--table-text-color);\r\n  border: 1px solid var(--table-text-color);\r\n  border-radius: 20px;\r\n  background-color: var(--table-background-color);\r\n}\r\n\r\n.sticky-header {\r\n  height: 650px;\r\n  position: relative;\r\n}\r\n\r\n.sticky-header .responsive-table-pro thead {\r\n  position: sticky;\r\n  top: 0;\r\n  z-index: 1;\r\n  background-color: white;\r\n}\r\n\r\n.table-container-pro .responsive-table-pro {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n  font-size: 16px;\r\n  text-align: left;\r\n  background-color: var(--table-background-color);\r\n  color: var(--table-text-color);\r\n}\r\n\r\n.table-container-pro thead,\r\n.table-container-pro tr {\r\n  border-bottom: 1px solid;\r\n}\r\n\r\n.table-container-pro .cursor-pointer {\r\n  cursor: pointer;\r\n}\r\n\r\n.table-container-pro .input-checkbox {\r\n  height: 16px;\r\n  width: 16px;\r\n}\r\n\r\n.table-container-pro .custom-chip-success {\r\n  background-color: #00c853;\r\n  color: #fff;\r\n  text-align: center;\r\n  padding: 4px 11px 7px 11px;\r\n  border-radius: 20px;\r\n  font-size: 14px;\r\n}\r\n\r\n.table-container-pro .custom-chip-error {\r\n  background-color: #f44336;\r\n  color: #fff;\r\n  text-align: center;\r\n  padding: 4px 11px 7px 11px;\r\n  border-radius: 20px;\r\n  font-size: 14px;\r\n}\r\n\r\n.table-container-pro .date-picker {\r\n  height: 30px;\r\n  font-size: 14px;\r\n  border: 1px solid;\r\n  outline: none;\r\n  border-radius: 5px;\r\n  padding: 2px 8px;\r\n}\r\n\r\n.table-container-pro table tr:hover {\r\n  background-color: var(--table-hover-color);\r\n}\r\n\r\n.table-container-pro .history-tr:hover {\r\n  background-color: var(--table-background-color);\r\n}\r\n\r\n.table-container-pro .history-tr td {\r\n  white-space: break-spaces;\r\n}\r\n\r\n.no_hover {\r\n  max-height: 0;\r\n  overflow: hidden;\r\n  transition: max-height 500ms cubic-bezier(0.4, 0, 0.2, 1);\r\n}\r\n\r\n.table-container-pro .data-not-found {\r\n  margin: 20px 0px;\r\n  text-align: center;\r\n}\r\n\r\n.table-container-pro .table-search input {\r\n  padding: 10px;\r\n  border: 1px solid;\r\n  border-radius: 5px;\r\n}\r\n\r\n.table-container-pro input {\r\n  background-color: var(--table-background-color);\r\n  color: var(--table-text-color);\r\n  border: 1px solid var(--table-text-color);\r\n}\r\n\r\n.table-container-pro th,\r\n.table-container-pro td {\r\n  text-align: left;\r\n  white-space: nowrap;\r\n  padding: 16px;\r\n}\r\n.table-container-pro thead th,\r\n.table-container-pro thead td {\r\n  background-color: var(--table-background-color);\r\n  color: var(--table-text-color);\r\n}\r\n\r\n.table-container-pro .image-avatar {\r\n  width: 40px;\r\n  height: 40px;\r\n  border-radius: 50px;\r\n  object-fit: cover;\r\n}\r\n\r\n.table-container-pro .image_avatar {\r\n  width: 40px;\r\n  height: 40px;\r\n  border-radius: 50px;\r\n  object-fit: cover;\r\n  background-color: #80808063;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  color: white;\r\n  text-transform: uppercase;\r\n  font-size: 20px;\r\n}\r\n\r\n.table-container-pro .thead-container-pro {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 15px;\r\n}\r\n\r\n.table-container-pro .show-history td {\r\n  white-space: break-spaces;\r\n  padding: 5px;\r\n}\r\n\r\n.table-container-pro .menu-popover-pro {\r\n  background: var(--table-background-color);\r\n  box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 8px;\r\n  border-radius: 4px;\r\n  position: absolute;\r\n  max-height: 300px;\r\n  overflow-x: auto;\r\n}\r\n\r\n.table-container-pro .list-items-button {\r\n  padding: 8px 16px;\r\n  border-bottom: 1px solid;\r\n  cursor: pointer;\r\n  white-space: break-spaces;\r\n}\r\n\r\n.table-container-pro .menus-child-items {\r\n  padding: 8px 26px;\r\n  border-bottom: 1px solid;\r\n  cursor: pointer;\r\n  white-space: break-spaces;\r\n}\r\n\r\n.table-container-pro .menu-icon svg {\r\n  cursor: pointer;\r\n}\r\n\r\n.table-container-pro svg {\r\n  fill: var(--table-svg-color);\r\n}\r\n\r\n.table-container-pro .list-items-button:hover {\r\n  background-color: var(--table-hover-color);\r\n}\r\n\r\n.table-container-pro .list-items-button:last-child {\r\n  border-bottom: none;\r\n}\r\n\r\n/* .table-container-pro .menu-arrow-top-box {\r\n  position: relative;\r\n}\r\n\r\n.table-container-pro .menu-arrow-top-box::before {\r\n  content: \"\";\r\n  display: block;\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 14px;\r\n  width: 10px;\r\n  height: 10px;\r\n  background-color: var(--table-background-color);\r\n  transform: translateY(-50%) rotate(45deg);\r\n  z-index: 0;\r\n} */\r\n\r\n.table-container-pro .pagination-container select {\r\n  border: none;\r\n  outline: none;\r\n  font-size: 16px;\r\n  margin-top: 5px;\r\n  margin-left: 5px;\r\n}\r\n\r\n.table-container-pro .pagination-container button {\r\n  background: transparent;\r\n  border: none;\r\n  outline: none;\r\n  color: black;\r\n  cursor: pointer;\r\n  font-size: 16px;\r\n}\r\n\r\n.table-container-pro .number-div {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.table-container-pro .number-div .history-div {\r\n  margin-right: 15px;\r\n  cursor: pointer;\r\n}\r\n\r\n.table-container-pro .pagination-container button:disabled svg,\r\n.table-container-pro .pagination-container button:disabled {\r\n  background: transparent;\r\n  border: none;\r\n  outline: none;\r\n  cursor: not-allowed;\r\n  fill: var(--table-svg-color);\r\n  opacity: 0.8;\r\n}\r\n\r\n.table-container-pro .pagination-container .pagination-page-button {\r\n  margin-top: 15px;\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.table-container-pro .pagination-container .count-button {\r\n  padding: 2px 10px;\r\n  background: var(--table-hover-color);\r\n  margin: 0 5px;\r\n  border-radius: 5px;\r\n  height: 28px;\r\n  width: 28px;\r\n  font-size: 14px;\r\n  line-height: 0;\r\n}\r\n\r\n.table-container-pro .pagination-container .pagination-page-select {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.table-container-pro\r\n  .pagination-container\r\n  .pagination-page-select\r\n  .pagination-count {\r\n  margin-left: 20px;\r\n}\r\n\r\n.table-container-pro .pagination-container .button-top {\r\n  margin-left: 25px;\r\n}\r\n\r\n.table-container-pro .pagination-container .custom-buttons {\r\n  margin: 20px 0px;\r\n  margin-left: 0px;\r\n}\r\n\r\n.table-container-pro .pagination-container .footer-count {\r\n  display: flex;\r\n  justify-content: end;\r\n  margin-right: 10px;\r\n  margin-top: 0px;\r\n}\r\n\r\n.table-container-pro .pagination-container .page-count {\r\n  color: var(--table-text-color);\r\n  background-color: #ffffff30;\r\n  border-radius: 2px;\r\n  height: 25px;\r\n  width: 25px;\r\n  margin: 0 5px;\r\n}\r\n\r\n.table-container-pro .pagination-container .page-count.active {\r\n  background-color: var(--table-svg-color);\r\n}\r\n\r\n.table-container-pro .pagination-container .count-button:hover,\r\n.table-container-pro .pagination-container .count-button.active {\r\n  background-color: #000;\r\n  color: #fff;\r\n}\r\n\r\n.table-container-pro .pagination-container .pagination-footer {\r\n  padding: 15px;\r\n  display: flex;\r\n  justify-content: end;\r\n}\r\n\r\n.table-container-pro .menu-search-box {\r\n  position: sticky;\r\n  top: 0;\r\n  z-index: 1;\r\n}\r\n\r\n.table-container-pro .menu-search-box .menu-search-input {\r\n  padding: 5px;\r\n  width: 100%;\r\n}\r\n\r\n.table-container-pro .custom-input {\r\n  margin-right: 10px;\r\n}\r\n\r\n.table-container-pro .custom-button {\r\n  padding: 5px 10px;\r\n  cursor: pointer;\r\n  background-color: var(--table-background-color);\r\n  border: 1px solid var(--table-text-color);\r\n  color: var(--table-text-color);\r\n  border-radius: 3px;\r\n}\r\n\r\n.table-container-pro select {\r\n  background-color: var(--table-background-color);\r\n  color: var(--table-text-color);\r\n}\r\n\r\n.table-container-pro .menu-dropdown-icon svg {\r\n  float: right !important;\r\n  margin-left: 15px;\r\n}\r\n\r\n.table-container-pro .history-container .user {\r\n  padding: 16px;\r\n}\r\n\r\n.table-container-pro .history-container .user-info {\r\n  display: flex;\r\n  align-items: center;\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.table-container-pro .history-container h3 {\r\n  margin: 0;\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.table-container-pro .history-container .user-info p,\r\n.table-container-pro .history-container .user-info h4 {\r\n  margin: 0;\r\n  margin-right: 20px;\r\n}\r\n\r\n.table-container-pro .history-item {\r\n  display: flex;\r\n  align-items: flex-start;\r\n  margin-bottom: 20px;\r\n  position: relative;\r\n}\r\n\r\n.table-container-pro .history-content {\r\n  padding: 15px;\r\n  border-radius: 8px;\r\n  background-color: var(--table-background-color);\r\n  border: 1px solid var(--table-text-color);\r\n  width: 100%;\r\n}\r\n\r\n.table-container-pro .date {\r\n  font-size: 14px;\r\n  color: var(--table-text-color);\r\n  opacity: 0.8;\r\n  margin-bottom: 5px;\r\n}\r\n\r\n.table-container-pro .event {\r\n  font-size: 16px;\r\n  color: var(--table-text-color);\r\n  margin: 0;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/index.css
var src = __webpack_require__(1);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// CONCATENATED MODULE: ./src/components/TableHeadList.jsx
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }

function TableHeadList(_ref) {
  var headLabel = _ref.headLabel,
    checkbox_selection = _ref.checkbox_selection,
    handleSelectAllClick = _ref.handleSelectAllClick,
    rowCount = _ref.rowCount,
    numSelected = _ref.numSelected;
  var _useState = Object(external_react_["useState"])([]),
    _useState2 = _slicedToArray(_useState, 2),
    tableHead = _useState2[0],
    setTableHead = _useState2[1];
  Object(external_react_["useEffect"])(function () {
    var updatedHeadLabel = _toConsumableArray(headLabel);
    if (checkbox_selection) {
      var select_all = {
        id: "is_checkbox_selected",
        label: /*#__PURE__*/external_react_default.a.createElement("input", {
          type: "checkbox",
          checked: rowCount === numSelected,
          onClick: function onClick(e) {
            return handleSelectAllClick(e);
          },
          className: "cursor-pointer input-checkbox"
        })
      };
      updatedHeadLabel = [select_all].concat(_toConsumableArray(updatedHeadLabel));
    }
    setTableHead(updatedHeadLabel);
  }, [headLabel, rowCount, numSelected]);
  return /*#__PURE__*/external_react_default.a.createElement("tr", null, tableHead.map(function (headCell, index) {
    return /*#__PURE__*/external_react_default.a.createElement("th", {
      key: index
    }, headCell.label);
  }));
}
// CONCATENATED MODULE: ./src/components/svg/MenuIcon.jsx

var MenuIcon_MenuIcon = function MenuIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 128 512",
    height: "20"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"
  }));
};
/* harmony default export */ var svg_MenuIcon = (MenuIcon_MenuIcon);
// CONCATENATED MODULE: ./src/components/svg/UpIcon.jsx

var UpIcon_UpIcon = function UpIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512",
    height: "16",
    style: {
      marginTop: "4px"
    }
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
  }));
};
/* harmony default export */ var svg_UpIcon = (UpIcon_UpIcon);
// CONCATENATED MODULE: ./src/components/svg/DownIcon.jsx

var DownIcon_DownIcon = function DownIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512",
    height: "16",
    style: {
      marginTop: "4px"
    }
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
  }));
};
/* harmony default export */ var svg_DownIcon = (DownIcon_DownIcon);
// CONCATENATED MODULE: ./src/components/CustomPopoverSectionItems.jsx
function CustomPopoverSectionItems_slicedToArray(r, e) { return CustomPopoverSectionItems_arrayWithHoles(r) || CustomPopoverSectionItems_iterableToArrayLimit(r, e) || CustomPopoverSectionItems_unsupportedIterableToArray(r, e) || CustomPopoverSectionItems_nonIterableRest(); }
function CustomPopoverSectionItems_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function CustomPopoverSectionItems_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return CustomPopoverSectionItems_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? CustomPopoverSectionItems_arrayLikeToArray(r, a) : void 0; } }
function CustomPopoverSectionItems_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function CustomPopoverSectionItems_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function CustomPopoverSectionItems_arrayWithHoles(r) { if (Array.isArray(r)) return r; }



function CustomPopoverSectionItems(props) {
  var _useState = Object(external_react_["useState"])(false),
    _useState2 = CustomPopoverSectionItems_slicedToArray(_useState, 2),
    openDropdown = _useState2[0],
    setOpenDropdown = _useState2[1];
  var item = props.item,
    data = props.data,
    setOpen = props.setOpen;
  var handleClickDropdown = function handleClickDropdown() {
    setOpenDropdown(!openDropdown);
  };
  return /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "list-items-button",
    onClick: function onClick(e) {
      if (item.child_options) {
        handleClickDropdown();
      } else {
        e.preventDefault();
        setOpen(false);
        item.handleClick(data);
      }
    }
  }, item.icon && item.icon, /*#__PURE__*/external_react_default.a.createElement("span", {
    style: {
      marginLeft: "12px"
    }
  }, item.label), /*#__PURE__*/external_react_default.a.createElement("span", {
    className: "menu-dropdown-icon"
  }, item.child_options && (openDropdown ? /*#__PURE__*/external_react_default.a.createElement(svg_UpIcon, null) : /*#__PURE__*/external_react_default.a.createElement(svg_DownIcon, null)))), item.child_options && item.child_options.length > 0 && /*#__PURE__*/external_react_default.a.createElement("div", null, openDropdown && item.child_options.map(function (child_option, index) {
    return /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "menus-child-items",
      key: index,
      onClick: function onClick(e) {
        e.preventDefault();
        setOpen(false);
        child_option.handleClick(data);
      }
    }, child_option.icon && child_option.icon, /*#__PURE__*/external_react_default.a.createElement("span", {
      style: {
        marginLeft: "12px"
      }
    }, child_option.label));
  })));
}
// CONCATENATED MODULE: ./src/components/CustomPopoverSection.jsx
function CustomPopoverSection_slicedToArray(r, e) { return CustomPopoverSection_arrayWithHoles(r) || CustomPopoverSection_iterableToArrayLimit(r, e) || CustomPopoverSection_unsupportedIterableToArray(r, e) || CustomPopoverSection_nonIterableRest(); }
function CustomPopoverSection_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function CustomPopoverSection_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return CustomPopoverSection_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? CustomPopoverSection_arrayLikeToArray(r, a) : void 0; } }
function CustomPopoverSection_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function CustomPopoverSection_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function CustomPopoverSection_arrayWithHoles(r) { if (Array.isArray(r)) return r; }



function CustomPopoverSection(props) {
  var menu = props.menu,
    data = props.data;
  var _useState = Object(external_react_["useState"])(false),
    _useState2 = CustomPopoverSection_slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var anchorRef = Object(external_react_["useRef"])(null);
  var _useState3 = Object(external_react_["useState"])(""),
    _useState4 = CustomPopoverSection_slicedToArray(_useState3, 2),
    searchInput = _useState4[0],
    setSearchInput = _useState4[1];
  var handleOpen = function handleOpen() {
    setOpen(!open);
  };
  var handleOutsideClick = function handleOutsideClick(e) {
    if (anchorRef.current && !anchorRef.current.contains(e.target)) {
      setOpen(false);
    }
  };
  Object(external_react_["useEffect"])(function () {
    document.addEventListener("mousedown", handleOutsideClick);
    return function () {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    ref: anchorRef
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    onClick: handleOpen,
    style: {
      marginTop: 5
    },
    className: "menu-icon"
  }, /*#__PURE__*/external_react_default.a.createElement(svg_MenuIcon, null)), open && /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "menu-popover-pro",
    style: {
      maxWidth: "330px"
    }
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "menu-arrow-top-box"
  }), menu.length > 8 && /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "menu-search-box"
  }, /*#__PURE__*/external_react_default.a.createElement("input", {
    className: "menu-search-input",
    type: "text",
    placeholder: "Search",
    value: searchInput,
    onChange: function onChange(e) {
      return setSearchInput(e.target.value);
    }
  })), menu.filter(function (option) {
    return option.label.toLowerCase().includes(searchInput.toLowerCase());
  }).map(function (option, i) {
    return /*#__PURE__*/external_react_default.a.createElement(CustomPopoverSectionItems, {
      key: i,
      item: option,
      data: data,
      setOpen: setOpen
    });
  })));
}
// CONCATENATED MODULE: ./src/components/UserListToolbar.jsx

function UserListToolbar(_ref) {
  var filterName = _ref.filterName,
    onFilterName = _ref.onFilterName;
  return /*#__PURE__*/external_react_default.a.createElement("input", {
    type: "text",
    value: filterName,
    onChange: onFilterName,
    placeholder: "Search"
  });
}
// CONCATENATED MODULE: ./src/components/UserListToolbarsForSearch.jsx

function UserListToolbarsForSearch(_ref) {
  var filterName = _ref.filterName,
    onFilterName = _ref.onFilterName,
    handleSubmit = _ref.handleSubmit;
  return /*#__PURE__*/external_react_default.a.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/external_react_default.a.createElement("input", {
    className: "custom-input",
    type: "text",
    value: filterName,
    onChange: onFilterName,
    placeholder: "Search"
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "custom-button"
  }, "Search"));
}
// CONCATENATED MODULE: ./src/components/svg/PageLeft.jsx

var PageLeft_PageLeft = function PageLeft() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    height: "15"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"
  }));
};
/* harmony default export */ var svg_PageLeft = (PageLeft_PageLeft);
// CONCATENATED MODULE: ./src/components/svg/PageRight.jsx

var PageRight_PageRight = function PageRight() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    height: "15"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
  }));
};
/* harmony default export */ var svg_PageRight = (PageRight_PageRight);
// CONCATENATED MODULE: ./src/components/Pagination.jsx



var Pagination_LocalPagination = function LocalPagination(_ref) {
  var rowsPerPage = _ref.rowsPerPage,
    handleChangeRowsPerPage = _ref.handleChangeRowsPerPage,
    filteredData = _ref.filteredData,
    handleChangePage = _ref.handleChangePage,
    page = _ref.page,
    footer = _ref.footer,
    custom_pagination = _ref.custom_pagination;
  var data_length = filteredData ? filteredData.length : 0;
  if (custom_pagination !== null && custom_pagination !== void 0 && custom_pagination.total_pages || (custom_pagination === null || custom_pagination === void 0 ? void 0 : custom_pagination.total_pages) == 0) {
    data_length = custom_pagination === null || custom_pagination === void 0 ? void 0 : custom_pagination.total_pages;
  }
  var startIndex = page * rowsPerPage;
  var startIndexLength = startIndex ? startIndex : 0;
  var endIndex = Math.min(startIndexLength + rowsPerPage, data_length);
  var endIndexLength = endIndex ? endIndex : 0;
  var totalPages = Math.ceil(data_length / rowsPerPage);
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "pagination-container"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "pagination-page-select ".concat(footer ? "pagination-footer" : "")
  }, /*#__PURE__*/external_react_default.a.createElement("span", null, " Rows per page: "), /*#__PURE__*/external_react_default.a.createElement("select", {
    value: rowsPerPage,
    className: "cursor-pointer",
    onChange: handleChangeRowsPerPage
  }, [10, 20, 50, 100].map(function (pageSize, index) {
    return /*#__PURE__*/external_react_default.a.createElement("option", {
      className: "cursor-pointer",
      key: index,
      value: pageSize
    }, pageSize);
  })), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "pagination-count"
  }, "".concat(startIndexLength + 1, "-").concat(endIndexLength, " of ").concat(data_length)), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "button-top"
  }, /*#__PURE__*/external_react_default.a.createElement("button", {
    onClick: function onClick() {
      return handleChangePage(page - 1);
    },
    disabled: page === 0,
    style: {
      paddingLeft: 0,
      paddingRight: "20px"
    }
  }, /*#__PURE__*/external_react_default.a.createElement(svg_PageLeft, null)), /*#__PURE__*/external_react_default.a.createElement("button", {
    onClick: function onClick() {
      return handleChangePage(page + 1);
    },
    disabled: endIndex >= data_length
  }, /*#__PURE__*/external_react_default.a.createElement(svg_PageRight, null)))), custom_pagination && /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "button-top custom-buttons ".concat(footer ? "footer-count" : "")
  }, /*#__PURE__*/external_react_default.a.createElement("button", {
    onClick: function onClick() {
      return handleChangePage(page - 1);
    },
    disabled: page === 0
  }, /*#__PURE__*/external_react_default.a.createElement(svg_PageLeft, null)), Array.from({
    length: totalPages
  }, function (_, index) {
    return /*#__PURE__*/external_react_default.a.createElement("button", {
      key: index,
      onClick: function onClick() {
        return handleChangePage(index);
      },
      className: "page-count ".concat(index === page ? "active" : "")
    }, index + 1);
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    onClick: function onClick() {
      return handleChangePage(page + 1);
    },
    disabled: endIndex >= data_length
  }, /*#__PURE__*/external_react_default.a.createElement(svg_PageRight, null))));
};
/* harmony default export */ var Pagination = (Pagination_LocalPagination);
// CONCATENATED MODULE: ./src/components/ShowHistory.jsx
function ShowHistory_toConsumableArray(r) { return ShowHistory_arrayWithoutHoles(r) || ShowHistory_iterableToArray(r) || ShowHistory_unsupportedIterableToArray(r) || ShowHistory_nonIterableSpread(); }
function ShowHistory_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function ShowHistory_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return ShowHistory_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? ShowHistory_arrayLikeToArray(r, a) : void 0; } }
function ShowHistory_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function ShowHistory_arrayWithoutHoles(r) { if (Array.isArray(r)) return ShowHistory_arrayLikeToArray(r); }
function ShowHistory_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }



function ShowHistory(props) {
  var head = props.head,
    row = props.row,
    expandedRows = props.expandedRows,
    setExpandedRows = props.setExpandedRows,
    index = props.index;
  var handleExpandClick = function handleExpandClick(rowId, index) {
    var isExist = expandedRows.find(function (id) {
      return id === rowId;
    });
    var element = document.getElementsByClassName("history-container")[index];
    var height = element.offsetHeight;
    var selectedElement = element.parentElement;
    if (isExist) {
      selectedElement.style.maxHeight = 0;
    } else {
      selectedElement.style.maxHeight = "".concat(height, "px");
    }
    setExpandedRows(function (old) {
      return old.includes(rowId) ? old.filter(function (id) {
        return id !== rowId;
      }) : [].concat(ShowHistory_toConsumableArray(old), [rowId]);
    });
  };
  if (!head || !head.show_history || !head.show_history(row).is_show_history) {
    return /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null);
  }
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    onClick: function onClick() {
      return handleExpandClick(row._id, index);
    },
    className: "history-div"
  }, head.show_history(row).icon ? head.show_history(row).icon : expandedRows.includes(row._id) ? /*#__PURE__*/external_react_default.a.createElement(svg_UpIcon, null) : /*#__PURE__*/external_react_default.a.createElement(svg_DownIcon, null));
}
// CONCATENATED MODULE: ./src/components/TableBody.jsx
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function TableBody_toConsumableArray(r) { return TableBody_arrayWithoutHoles(r) || TableBody_iterableToArray(r) || TableBody_unsupportedIterableToArray(r) || TableBody_nonIterableSpread(); }
function TableBody_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function TableBody_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function TableBody_arrayWithoutHoles(r) { if (Array.isArray(r)) return TableBody_arrayLikeToArray(r); }
function TableBody_slicedToArray(r, e) { return TableBody_arrayWithHoles(r) || TableBody_iterableToArrayLimit(r, e) || TableBody_unsupportedIterableToArray(r, e) || TableBody_nonIterableRest(); }
function TableBody_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function TableBody_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return TableBody_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? TableBody_arrayLikeToArray(r, a) : void 0; } }
function TableBody_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function TableBody_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function TableBody_arrayWithHoles(r) { if (Array.isArray(r)) return r; }



var TableBody_TableBody = function TableBody(_ref) {
  var slicedData = _ref.slicedData,
    TABLE_HEAD = _ref.TABLE_HEAD,
    selected = _ref.selected,
    setSelected = _ref.setSelected,
    selected_by = _ref.selected_by,
    MENU_OPTIONS = _ref.MENU_OPTIONS,
    checkbox_selection = _ref.checkbox_selection,
    page = _ref.page,
    rowsPerPage = _ref.rowsPerPage;
  var _useState = Object(external_react_["useState"])([]),
    _useState2 = TableBody_slicedToArray(_useState, 2),
    expandedRows = _useState2[0],
    setExpandedRows = _useState2[1];
  var handleClick = function handleClick(name) {
    var selectedIndex = selected === null || selected === void 0 ? void 0 : selected.some(function (obj) {
      if (selected_by && selected_by !== "") {
        return obj[selected_by] === name[selected_by];
      } else {
        return obj._id === name._id;
      }
    });
    if (selectedIndex === true) {
      var new_array = selected.filter(function (item) {
        if (selected_by && selected_by !== "") {
          return item[selected_by] !== name[selected_by];
        } else {
          return item._id !== name._id;
        }
      });
      setSelected(new_array);
    } else {
      setSelected(function (selected) {
        return [].concat(TableBody_toConsumableArray(selected), [name]);
      });
    }
  };
  var historyHead = TABLE_HEAD.find(function (head) {
    return head.show_history;
  });
  var renderCell = function renderCell(row, head, i, index) {
    var historyObj = {
      head: head,
      row: row,
      index: index,
      expandedRows: expandedRows,
      setExpandedRows: setExpandedRows
    };
    if (head.type === "checkbox") {
      return /*#__PURE__*/external_react_default.a.createElement("td", {
        className: head.className,
        key: i
      }, /*#__PURE__*/external_react_default.a.createElement("div", {
        className: "number-div"
      }, /*#__PURE__*/external_react_default.a.createElement(ShowHistory, historyObj), /*#__PURE__*/external_react_default.a.createElement("input", {
        type: "checkbox",
        checked: row[head.id],
        className: "cursor-pointer input-checkbox",
        onChange: function onChange(e) {
          if (head.handleClick) {
            head.handleClick(e, row, index);
          }
        }
      })));
    } else if (head.type === "history") {
      return /*#__PURE__*/external_react_default.a.createElement("td", {
        className: head.className,
        key: i
      }, /*#__PURE__*/external_react_default.a.createElement(ShowHistory, historyObj));
    } else if (head.type === "radio_button") {
      return /*#__PURE__*/external_react_default.a.createElement("td", {
        className: head.className,
        key: i
      }, /*#__PURE__*/external_react_default.a.createElement("div", {
        className: "number-div"
      }, /*#__PURE__*/external_react_default.a.createElement(ShowHistory, historyObj), /*#__PURE__*/external_react_default.a.createElement("input", {
        type: "radio",
        checked: row[head.id],
        className: "cursor-pointer input-checkbox",
        onChange: function onChange(e) {
          if (head.handleClick) {
            head.handleClick(e, row, index);
          }
        }
      })));
    } else if (head.type === "row_calendar") {
      if (row.is_show_celendar === true) {
        return /*#__PURE__*/external_react_default.a.createElement("td", {
          className: head.className,
          key: i
        }, /*#__PURE__*/external_react_default.a.createElement("div", {
          className: "number-div"
        }, /*#__PURE__*/external_react_default.a.createElement(ShowHistory, historyObj), /*#__PURE__*/external_react_default.a.createElement("input", {
          type: "date",
          className: "".concat(head.className, " date-picker"),
          onChange: function onChange(date) {
            if (head.handleChangeDate) {
              head.handleChangeDate(date, index, row);
            }
          },
          value: row[head.id]
        })));
      } else {
        return /*#__PURE__*/external_react_default.a.createElement("td", {
          key: i
        });
      }
    } else if (head.type === "number") {
      return /*#__PURE__*/external_react_default.a.createElement("td", {
        className: head.className,
        key: i
      }, /*#__PURE__*/external_react_default.a.createElement("div", {
        className: "number-div"
      }, /*#__PURE__*/external_react_default.a.createElement(ShowHistory, historyObj), /*#__PURE__*/external_react_default.a.createElement("span", {
        className: row.className,
        onClick: function onClick() {
          if (head.handleClick) {
            head.handleClick(row, index);
          }
        }
      }, index + 1 + rowsPerPage * page)));
    } else if (head.type === "row_status") {
      return /*#__PURE__*/external_react_default.a.createElement("td", {
        className: head.className,
        key: i
      }, /*#__PURE__*/external_react_default.a.createElement("div", {
        className: "number-div"
      }, /*#__PURE__*/external_react_default.a.createElement(ShowHistory, historyObj), /*#__PURE__*/external_react_default.a.createElement("div", {
        className: "".concat(row[head.id] === true ? "custom-chip-success " + row.className : "custom-chip-error"),
        onClick: function onClick() {
          if (head.handleClick) {
            head.handleClick(row, index);
          }
        }
      }, row[head.id] === true ? "Active" : "Inactive")));
    } else if (head.type === "thumbnail") {
      var _row$head$id, _row$head$id2, _row$head$id3, _row$head$id4;
      return /*#__PURE__*/external_react_default.a.createElement("td", {
        className: head.className,
        key: i
      }, /*#__PURE__*/external_react_default.a.createElement("div", {
        className: "number-div"
      }, /*#__PURE__*/external_react_default.a.createElement(ShowHistory, historyObj), (_row$head$id = row[head.id]) !== null && _row$head$id !== void 0 && _row$head$id.src ? /*#__PURE__*/external_react_default.a.createElement("img", {
        className: "image-avatar",
        alt: (_row$head$id2 = row[head.id]) === null || _row$head$id2 === void 0 ? void 0 : _row$head$id2.alt,
        src: (_row$head$id3 = row[head.id]) === null || _row$head$id3 === void 0 ? void 0 : _row$head$id3.src
      }) : /*#__PURE__*/external_react_default.a.createElement("div", {
        className: "image_avatar"
      }, (_row$head$id4 = row[head.id]) === null || _row$head$id4 === void 0 ? void 0 : _row$head$id4.alt[0])));
    } else if (head.type === "link") {
      return /*#__PURE__*/external_react_default.a.createElement("td", {
        className: head.className,
        key: i
      }, /*#__PURE__*/external_react_default.a.createElement("div", {
        className: "number-div"
      }, /*#__PURE__*/external_react_default.a.createElement(ShowHistory, historyObj), row[head.id].show_text ? /*#__PURE__*/external_react_default.a.createElement("a", {
        href: row[head.id].to,
        className: row[head.id].className,
        target: row[head.id].target
      }, row[head.id].show_text) : row[head.id].show_alternate_text ? row[head.id].show_alternate_text : ""));
    } else if (head.type === "action") {
      var _options;
      var type_of = _typeof(MENU_OPTIONS);
      var options = MENU_OPTIONS;
      if (type_of === "function") {
        options = MENU_OPTIONS(row);
      }
      return /*#__PURE__*/external_react_default.a.createElement("td", {
        className: head.className,
        key: i
      }, /*#__PURE__*/external_react_default.a.createElement("div", {
        className: "number-div"
      }, /*#__PURE__*/external_react_default.a.createElement(ShowHistory, historyObj), ((_options = options) === null || _options === void 0 ? void 0 : _options.length) > 0 && /*#__PURE__*/external_react_default.a.createElement(CustomPopoverSection, {
        menu: options,
        data: row
      })));
    } else if (head.type === "html") {
      return /*#__PURE__*/external_react_default.a.createElement("td", {
        className: head.className,
        key: i
      }, /*#__PURE__*/external_react_default.a.createElement("div", {
        className: "number-div"
      }, /*#__PURE__*/external_react_default.a.createElement(ShowHistory, historyObj), /*#__PURE__*/external_react_default.a.createElement("div", {
        className: row.className,
        dangerouslySetInnerHTML: {
          __html: row[head.id]
        }
      })));
    } else {
      return /*#__PURE__*/external_react_default.a.createElement("td", {
        className: head.className,
        key: i
      }, head.renderData ? head.renderData(row, index) : /*#__PURE__*/external_react_default.a.createElement("span", {
        className: row.className,
        onClick: function onClick() {
          if (head.handleClick) {
            head.handleClick(row, index);
          }
        }
      }, row[head.id]));
    }
  };
  return /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, slicedData.length > 0 ? /*#__PURE__*/external_react_default.a.createElement("tbody", null, slicedData.map(function (row, index) {
    var isItemSelected = (selected === null || selected === void 0 ? void 0 : selected.length) < 1 ? false : selected === null || selected === void 0 ? void 0 : selected.some(function (obj) {
      if (selected_by && selected_by !== "") {
        return obj[selected_by] === row[selected_by];
      } else {
        return obj._id === row._id;
      }
    });
    return /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, {
      key: index
    }, /*#__PURE__*/external_react_default.a.createElement("tr", {
      tabIndex: -1,
      role: "checkbox",
      selected: isItemSelected,
      "aria-checked": isItemSelected
    }, checkbox_selection && /*#__PURE__*/external_react_default.a.createElement("td", null, /*#__PURE__*/external_react_default.a.createElement("input", {
      type: "checkbox",
      checked: isItemSelected,
      className: "cursor-pointer input-checkbox",
      onChange: function onChange() {
        return handleClick(row);
      }
    })), TABLE_HEAD.map(function (head, i) {
      return renderCell(row, head, i, index);
    })), /*#__PURE__*/external_react_default.a.createElement("tr", {
      className: "history-tr",
      style: {
        borderBottom: expandedRows.includes(row._id) ? "1px solid" : "none"
      }
    }, /*#__PURE__*/external_react_default.a.createElement("td", {
      colSpan: TABLE_HEAD.length,
      style: {
        padding: 0
      }
    }, /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "no_hover"
    }, /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "history-container"
    }, historyHead ? historyHead.show_history(row).component : "")))));
  })) : /*#__PURE__*/external_react_default.a.createElement("tbody", null, /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", {
    colSpan: checkbox_selection ? 1 + TABLE_HEAD.length : TABLE_HEAD.length,
    className: "data-not-found"
  }, "Data Not Found"))));
};
/* harmony default export */ var components_TableBody = (TableBody_TableBody);
// CONCATENATED MODULE: ./src/components/index.js







// CONCATENATED MODULE: ./src/index.js
function src_slicedToArray(r, e) { return src_arrayWithHoles(r) || src_iterableToArrayLimit(r, e) || src_unsupportedIterableToArray(r, e) || src_nonIterableRest(); }
function src_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function src_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return src_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? src_arrayLikeToArray(r, a) : void 0; } }
function src_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function src_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function src_arrayWithHoles(r) { if (Array.isArray(r)) return r; }



var applyThemeConfig = function applyThemeConfig(themeConfig) {
  var setThemeProperty = function setThemeProperty(property, value) {
    document.documentElement.style.setProperty(property, value);
  };
  if (themeConfig) {
    setThemeProperty("--table-background-color", themeConfig.background);
    setThemeProperty("--table-text-color", themeConfig.color);
    setThemeProperty("--table-svg-color", themeConfig.iconColor);
  }
};
var filterDataByName = function filterDataByName(data, filterName) {
  return data.filter(function (item) {
    return item.name.toLowerCase().includes(filterName.toLowerCase());
  });
};
var sliceData = function sliceData(data, page, rowsPerPage) {
  var startIndex = page * rowsPerPage;
  var endIndex = Math.min(startIndex + rowsPerPage, data.length);
  return data.slice(startIndex, endIndex);
};
var src_ReactTable = function ReactTable(_ref) {
  var data = _ref.data,
    TABLE_HEAD = _ref.TABLE_HEAD,
    MENU_OPTIONS = _ref.MENU_OPTIONS,
    checkbox_selection = _ref.checkbox_selection,
    is_sticky_header = _ref.is_sticky_header,
    is_hide_footer_pagination = _ref.is_hide_footer_pagination,
    is_hide_header_pagination = _ref.is_hide_header_pagination,
    is_hide_search = _ref.is_hide_search,
    custom_search = _ref.custom_search,
    class_name = _ref.class_name,
    theme_config = _ref.theme_config,
    custom_pagination = _ref.custom_pagination;
  var _useState = Object(external_react_["useState"])(0),
    _useState2 = src_slicedToArray(_useState, 2),
    page = _useState2[0],
    setPage = _useState2[1];
  var _useState3 = Object(external_react_["useState"])(50),
    _useState4 = src_slicedToArray(_useState3, 2),
    rowsPerPage = _useState4[0],
    setRowsPerPage = _useState4[1];
  var _useState5 = Object(external_react_["useState"])(""),
    _useState6 = src_slicedToArray(_useState5, 2),
    filterName = _useState6[0],
    setFilterName = _useState6[1];
  var selected_by = checkbox_selection === null || checkbox_selection === void 0 ? void 0 : checkbox_selection.selected_by;
  var setSelected = checkbox_selection === null || checkbox_selection === void 0 ? void 0 : checkbox_selection.setSelected;
  var selected = checkbox_selection === null || checkbox_selection === void 0 ? void 0 : checkbox_selection.selected;
  var filteredData = filterDataByName(data, filterName);
  var slicedData = custom_pagination ? filteredData : sliceData(filteredData, page, rowsPerPage);
  var handleFilterByName = function handleFilterByName(event) {
    setFilterName(event.target.value);
    setPage(0);
  };
  var handleSearchText = function handleSearchText(event) {
    custom_search.setSearchText(event.target.value);
  };
  var handleChangePage = function handleChangePage(newPage) {
    if (custom_pagination !== null && custom_pagination !== void 0 && custom_pagination.handleChangePage) {
      custom_pagination.handleChangePage(newPage);
      return;
    }
    setPage(newPage);
  };
  var handleChangeRowsPerPage = function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  var handleSelectAllClick = function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data);
      return;
    }
    setSelected([]);
  };
  Object(external_react_["useEffect"])(function () {
    applyThemeConfig(theme_config);
  }, [theme_config]);
  Object(external_react_["useEffect"])(function () {
    if (custom_pagination) {
      var _page = custom_pagination.page,
        rows_per_page = custom_pagination.rows_per_page;
      if (_page || _page == 0) {
        setPage(_page);
      }
      if (rows_per_page) {
        setRowsPerPage(rows_per_page);
      }
    }
  }, [custom_pagination]);
  console.log(slicedData, "slicedDataslicedData");
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "table-container-pro ".concat(class_name ? class_name : "", " ").concat(is_sticky_header ? "sticky-header" : "")
  }, !is_hide_search && !is_hide_header_pagination && /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "thead-container-pro"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "pagination-container"
  }, !is_hide_header_pagination && /*#__PURE__*/external_react_default.a.createElement(Pagination, {
    rowsPerPage: rowsPerPage,
    handleChangeRowsPerPage: handleChangeRowsPerPage,
    filteredData: filteredData,
    handleChangePage: handleChangePage,
    page: page,
    custom_pagination: custom_pagination
  })), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "table-search"
  }, custom_search ? /*#__PURE__*/external_react_default.a.createElement(UserListToolbarsForSearch, {
    filterName: custom_search.searchText,
    onFilterName: handleSearchText,
    handleSubmit: custom_search.handleSubmit
  }) : /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, !is_hide_search && /*#__PURE__*/external_react_default.a.createElement(UserListToolbar, {
    filterName: filterName,
    onFilterName: handleFilterByName
  })))), /*#__PURE__*/external_react_default.a.createElement("table", {
    className: "responsive-table-pro"
  }, /*#__PURE__*/external_react_default.a.createElement("thead", null, /*#__PURE__*/external_react_default.a.createElement(TableHeadList, {
    headLabel: TABLE_HEAD,
    rowCount: filteredData.length,
    numSelected: checkbox_selection && (selected === null || selected === void 0 ? void 0 : selected.length),
    checkbox_selection: checkbox_selection,
    handleSelectAllClick: handleSelectAllClick
  })), /*#__PURE__*/external_react_default.a.createElement(components_TableBody, {
    slicedData: slicedData,
    TABLE_HEAD: TABLE_HEAD,
    selected: selected,
    setSelected: setSelected,
    selected_by: selected_by,
    MENU_OPTIONS: MENU_OPTIONS,
    checkbox_selection: checkbox_selection,
    page: page,
    rowsPerPage: rowsPerPage
  })), !is_hide_footer_pagination && /*#__PURE__*/external_react_default.a.createElement(Pagination, {
    rowsPerPage: rowsPerPage,
    handleChangeRowsPerPage: handleChangeRowsPerPage,
    filteredData: filteredData,
    handleChangePage: handleChangePage,
    page: page,
    custom_pagination: custom_pagination,
    footer: true
  }));
};
/* harmony default export */ var src_0 = __webpack_exports__["default"] = (src_ReactTable);

/***/ })
/******/ ]);