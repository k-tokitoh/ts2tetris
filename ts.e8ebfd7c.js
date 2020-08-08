// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"d51b7545ee38d2d3f793c729451fb2f3":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "e8ebfd7c39db3ab79b548e69d043a82d";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"1b4b89b226e7f55d440fa57f9fc4860c":[function(require,module,exports) {
"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = () => new _app.default();
},{"./app":"edd0615a324f2db2daa34e56ad96feee"}],"edd0615a324f2db2daa34e56ad96feee":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _game = _interopRequireDefault(require("./game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App {
  constructor() {
    this.elem = document.getElementById("app");
    this.prepareGame();
  }

  prepareGame() {
    this.game = null;
    document.addEventListener("keypress", () => {
      if (this.game) return;
      this.game = new _game.default(this.elem);
    });
  }

}

var _default = App;
exports.default = _default;
},{"./game":"33bf8ba056748770c85d4efe95236492"}],"33bf8ba056748770c85d4efe95236492":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _grid = _interopRequireDefault(require("./grid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Game {
  constructor(parentElem) {
    this.elem = document.createElement("div");
    parentElem.appendChild(this.elem);
    this.grid = new _grid.default(this.elem);
    setInterval(() => {
      this.grid.tick();
    }, 500);
  }

}

var _default = Game;
exports.default = _default;
},{"./grid":"ba3e94b73492c1639d51f8611b895965"}],"ba3e94b73492c1639d51f8611b895965":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cell = _interopRequireDefault(require("./cell"));

var _tetrimino = _interopRequireDefault(require("./tetrimino"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Grid {
  constructor(parentElem) {
    this.elem = document.createElement("ul");
    parentElem.appendChild(this.elem);
    this.setInitialStyles();
    this.setCells();
    this.currentTetrimino = new _tetrimino.default();
    this.draw();
  }

  setCells() {
    this.cells = Array(Grid.HEIGHT).fill(null).map(() => Array(Grid.WIDTH).fill(null).map(() => new _cell.default(this.elem)));
  }

  setInitialStyles() {
    this.elem.style.display = "grid";
    this.elem.style.gridTemplateColumns = `repeat(${Grid.WIDTH}, 32px)`;
    this.elem.style.gridTemplateRows = `repeat(${Grid.HEIGHT}, 32px)`;
    this.elem.style.justifyItems = "center";
    this.elem.style.alignItems = "center";
  }

  draw() {
    this.cells.forEach(cellsRow => cellsRow.forEach(cell => cell.clear()));
    this.currentTetrimino.occupiedAbsolutePositions().forEach(position => this.cells[Grid.HEIGHT - 1 - position.y][position.x].fill());
  }

  tick() {
    this.currentTetrimino.moveDown();
    this.draw();
  }

}

_defineProperty(Grid, "HEIGHT", 20);

_defineProperty(Grid, "WIDTH", 10);

var _default = Grid;
exports.default = _default;
},{"./cell":"b70b289d34d20a81da4fb8dad7a40876","./tetrimino":"f75ed70044904b7f08eae709cbe41b61"}],"b70b289d34d20a81da4fb8dad7a40876":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const FILLED_COLOR = "#000000";
const EMPTY_COLOR = "#E0E0E0";

class CellOuter {
  constructor(parentElem) {
    this.elem = document.createElement("li");
    parentElem.appendChild(this.elem);
    this.setInitialStyles();
    this.inner = new CellInner(this.elem);
  }

  setInitialStyles() {
    this.elem.style.listStyle = "none";
    this.elem.style.width = "78%";
    this.elem.style.height = "78%";
    this.elem.style.border = "2px solid";
    this.elem.style.display = "flex";
    this.elem.style.justifyContent = "center";
    this.elem.style.alignItems = "center";
  }

  fill() {
    this.elem.style.borderColor = FILLED_COLOR;
    this.inner.fill();
  }

  clear() {
    this.elem.style.borderColor = EMPTY_COLOR;
    this.inner.clear();
  }

}

class CellInner {
  constructor(parentElem) {
    this.elem = document.createElement("div");
    parentElem.appendChild(this.elem);
    this.elem.style.width = "75%";
    this.elem.style.height = "75%";
    this.elem.style.backgroundColor = EMPTY_COLOR;
  }

  fill() {
    this.elem.style.backgroundColor = FILLED_COLOR;
  }

  clear() {
    this.elem.style.backgroundColor = EMPTY_COLOR;
  }

}

var _default = CellOuter;
exports.default = _default;
},{}],"f75ed70044904b7f08eae709cbe41b61":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _position = require("./position");

const tRelativePositions = [new _position.RelativePosition(0, 0), new _position.RelativePosition(-1, 0), new _position.RelativePosition(1, 0), new _position.RelativePosition(0, 1)];

class Tetrimino {
  constructor() {
    this.centerPosition = new _position.AbsolutePosition(5, 15);
    this.occupiedRelativePositions = tRelativePositions;
  }

  occupiedAbsolutePositions() {
    return this.occupiedRelativePositions.map(relativePosition => this.centerPosition.getAbsolute(relativePosition));
  }

  moveDown() {
    if (!this.canMoveDown()) return;
    this.centerPosition.y -= 1;
  }

  canMoveDown() {
    return this.occupiedAbsolutePositions().every(occupiedAbsolutePosition => 0 < occupiedAbsolutePosition.y);
  }

}

var _default = Tetrimino;
exports.default = _default;
},{"./position":"471495f57cb7c4ce0f9427dac5bec78c"}],"471495f57cb7c4ce0f9427dac5bec78c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelativePosition = exports.AbsolutePosition = void 0;

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

}

class AbsolutePosition extends Position {
  getAbsolute(relativePosition) {
    return new AbsolutePosition(this.x + relativePosition.x, this.y + relativePosition.y);
  }

}

exports.AbsolutePosition = AbsolutePosition;

class RelativePosition extends Position {}

exports.RelativePosition = RelativePosition;
},{}]},{},["d51b7545ee38d2d3f793c729451fb2f3","1b4b89b226e7f55d440fa57f9fc4860c"], null)

//# sourceMappingURL=ts.e8ebfd7c.js.map
