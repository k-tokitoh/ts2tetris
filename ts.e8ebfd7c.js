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

var _appView = _interopRequireDefault(require("./views/appView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = () => new _appView.default();
},{"./views/appView":"c7afdcca3d6a4d4004dfdc496a19cef4"}],"c7afdcca3d6a4d4004dfdc496a19cef4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gameView = _interopRequireDefault(require("./gameView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AppView {
  constructor() {
    _defineProperty(this, "elem", document.getElementById("app"));

    document.addEventListener("keypress", () => {
      if (this.gameView) return;
      this.gameView = new _gameView.default(this);
    });
  }

}

var _default = AppView;
exports.default = _default;
},{"./gameView":"5b79214a41f8f26a3b969dc6163363b7"}],"5b79214a41f8f26a3b969dc6163363b7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gridView = _interopRequireDefault(require("./gridView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class GameView {
  constructor(parentView) {
    _defineProperty(this, "elem", document.createElement("div"));

    _defineProperty(this, "gridView", new _gridView.default(this));

    parentView.elem.appendChild(this.elem);
  }

}

var _default = GameView;
exports.default = _default;
},{"./gridView":"565af72446ef9cdaf45c1bda46c8ad1e"}],"565af72446ef9cdaf45c1bda46c8ad1e":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _grid = _interopRequireDefault(require("../models/grid"));

var _cellView = _interopRequireDefault(require("./cellView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class GridView {
  constructor(parentView) {
    _defineProperty(this, "model", new _grid.default(this.draw.bind(this)));

    _defineProperty(this, "elem", this.initialElem());

    _defineProperty(this, "cellViews", this.initialCellViews());

    parentView.elem.appendChild(this.elem);
    this.draw();
    document.addEventListener("keydown", e => this.onKeyDown(e));
  }

  initialElem() {
    const elem = document.createElement("ul");
    elem.style.display = "grid";
    elem.style.gridTemplateColumns = `repeat(${_grid.default.WIDTH}, 32px)`;
    elem.style.gridTemplateRows = `repeat(${_grid.default.HEIGHT}, 32px)`;
    elem.style.justifyItems = "center";
    elem.style.alignItems = "center";
    return elem;
  }

  initialCellViews() {
    return Array(_grid.default.HEIGHT).fill(null).map(() => Array(_grid.default.WIDTH).fill(null).map(() => new _cellView.default(this)));
  }

  draw() {
    this.cellViews.forEach(cellsRow => cellsRow.forEach(cell => cell.clear()));
    this.model.currentTetrimino.occupiedAbsolutePositions().forEach(position => this.cellViews[_grid.default.HEIGHT - 1 - position.y][position.x].fill());
  }

  onKeyDown(e) {
    switch (e.key) {
      case "ArrowLeft":
        this.model.currentTetrimino.moveLeft();
        this.draw();
        break;

      case "ArrowRight":
        this.model.currentTetrimino.moveRight();
        this.draw();
        break;

      case "d":
        this.model.currentTetrimino.rotateClockwise();
        this.draw();
        break;

      case "s":
        this.model.currentTetrimino.rotateCounterClockwise();
        this.draw();
        break;
    }
  }

}

var _default = GridView;
exports.default = _default;
},{"../models/grid":"7647825bc86bcd64559b2a589f0cc128","./cellView":"d53d46a01b20caa5b3558eb3265a47be"}],"7647825bc86bcd64559b2a589f0cc128":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tetrimino = _interopRequireDefault(require("./tetrimino"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Grid {
  constructor(updateView) {
    _defineProperty(this, "currentTetrimino", new _tetrimino.default(this.inGrid.bind(this)));

    setInterval(() => {
      this.tick(updateView);
    }, 500);
  }

  tick(updateView) {
    this.currentTetrimino.moveDown();
    updateView();
  }

  inGrid(position) {
    return 0 <= position.x && position.x <= Grid.WIDTH - 1 && 0 <= position.y;
  }

}

_defineProperty(Grid, "HEIGHT", 20);

_defineProperty(Grid, "WIDTH", 10);

var _default = Grid;
exports.default = _default;
},{"./tetrimino":"26ad3baa1836ca50e03e4c55252637dd"}],"26ad3baa1836ca50e03e4c55252637dd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _position = require("./position");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const tRelativePositions = [new _position.RelativePosition(0, 0), new _position.RelativePosition(-1, 0), new _position.RelativePosition(1, 0), new _position.RelativePosition(0, 1)];

class Tetrimino {
  constructor(inGrid) {
    _defineProperty(this, "centerPosition", new _position.AbsolutePosition(5, 15));

    this.occupiedRelativePositions = tRelativePositions;
    this.inGrid = inGrid;
  }

  occupiedAbsolutePositions() {
    return this.occupiedRelativePositions.map(relativePosition => this.centerPosition.getAbsolute(relativePosition));
  }

  moveDown() {
    this.move(new _position.RelativePosition(0, -1));
  }

  moveLeft() {
    this.move(new _position.RelativePosition(-1, 0));
  }

  moveRight() {
    this.move(new _position.RelativePosition(1, 0));
  }

  move(vector) {
    const nextCenterPosition = this.centerPosition.getAbsolute(vector);

    if (this.canMoveTo(nextCenterPosition)) {
      this.centerPosition = nextCenterPosition;
    }
  }

  canMoveTo(nextCenterPosition) {
    const nextAbosolutePositions = this.occupiedRelativePositions.map(position => nextCenterPosition.getAbsolute(position));
    return this.canBeIn(nextAbosolutePositions);
  }

  rotateClockwise() {
    this.rotate(position => new _position.RelativePosition(position.y, -position.x));
  }

  rotateCounterClockwise() {
    this.rotate(position => new _position.RelativePosition(-position.y, position.x));
  }

  rotate(rotateFuction) {
    const nextRelativePositions = this.occupiedRelativePositions.map(rotateFuction);
    const nextAbsolutePositions = nextRelativePositions.map(position => this.centerPosition.getAbsolute(position));

    if (this.canBeIn(nextAbsolutePositions)) {
      this.occupiedRelativePositions = nextRelativePositions;
    }
  }

  canBeIn(nextOccupiedAbsolutePositions) {
    return nextOccupiedAbsolutePositions.every(this.inGrid);
  }

}

var _default = Tetrimino;
exports.default = _default;
},{"./position":"051c5f2b0879b2bda3be9afd48439570"}],"051c5f2b0879b2bda3be9afd48439570":[function(require,module,exports) {
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
},{}],"d53d46a01b20caa5b3558eb3265a47be":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const FILLED_COLOR = "#000000";
const EMPTY_COLOR = "#E0E0E0";

class OuterCellView {
  constructor(parentView) {
    _defineProperty(this, "elem", this.initialElem());

    _defineProperty(this, "innerCellView", new InnerCellView(this));

    parentView.elem.appendChild(this.elem);
  }

  initialElem() {
    const elem = document.createElement("li");
    elem.style.listStyle = "none";
    elem.style.width = "78%";
    elem.style.height = "78%";
    elem.style.border = "2px solid";
    elem.style.display = "flex";
    elem.style.justifyContent = "center";
    elem.style.alignItems = "center";
    return elem;
  }

  fill() {
    this.elem.style.borderColor = FILLED_COLOR;
    this.innerCellView.fill();
  }

  clear() {
    this.elem.style.borderColor = EMPTY_COLOR;
    this.innerCellView.clear();
  }

}

class InnerCellView {
  constructor(parentView) {
    this.elem = document.createElement("div");
    parentView.elem.appendChild(this.elem);
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

var _default = OuterCellView;
exports.default = _default;
},{}]},{},["d51b7545ee38d2d3f793c729451fb2f3","1b4b89b226e7f55d440fa57f9fc4860c"], null)

//# sourceMappingURL=ts.e8ebfd7c.js.map
