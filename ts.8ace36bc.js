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
})({"1a939072b57cebe75842efe0ba75e6bd":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "8ace36bceb032ab0728c465fa5e9ee55";
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class App {
  constructor() {
    _defineProperty(this, "elem", document.getElementById("app"));

    _defineProperty(this, "prepareGame", () => {
      this.game = null;
      document.addEventListener("keypress", () => {
        if (this.game) return;
        this.game = new _game.default(this.elem);
      });
    });

    this.prepareGame();
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Game {
  constructor(parentElem) {
    _defineProperty(this, "elem", document.createElement("div"));

    _defineProperty(this, "grid", new _grid.default(this.elem));

    _defineProperty(this, "toggleTimer", () => {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      } else {
        this.setTimer();
      }
    });

    _defineProperty(this, "setTimer", () => {
      this.timerId = setInterval(() => {
        this.grid.tick();
      }, 100);
    });

    _defineProperty(this, "onKeyDown", e => {
      switch (e.key) {
        case "ArrowLeft":
          this.grid.moveTetriminoLeft();
          break;

        case "ArrowRight":
          this.grid.moveTetriminoRight();
          break;

        case "d":
          this.grid.rotateTetriminoClockwise();
          break;

        case "s":
          this.grid.rotateTetriminoCounterClockwise();
          break;

        case "p":
          this.toggleTimer();
          break;
      }
    });

    parentElem.appendChild(this.elem);
    this.setTimer();
    document.addEventListener("keydown", e => this.onKeyDown(e));
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

var _area = _interopRequireDefault(require("./area"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Grid {
  constructor(parentElem) {
    _defineProperty(this, "area", new _area.default(20, 10));

    _defineProperty(this, "currentTetrimino", new _tetrimino.default(this));

    _defineProperty(this, "sediment", []);

    _defineProperty(this, "initialElem", area => {
      const elem = document.createElement("ul");
      elem.style.display = "grid";
      elem.style.gridTemplateColumns = `repeat(${area.width}, 32px)`;
      elem.style.gridTemplateRows = `repeat(${area.height}, 32px)`;
      elem.style.justifyItems = "center";
      elem.style.alignItems = "center";
      return elem;
    });

    _defineProperty(this, "initialCells", area => {
      return Array(area.height).fill(null).map(() => Array(area.width).fill(null).map(() => new _cell.default(this.elem)));
    });

    _defineProperty(this, "draw", () => {
      this.cells.forEach(cellsRow => cellsRow.forEach(cell => cell.clear()));
      this.currentTetrimino.occupiedPositions().concat(this.sediment).forEach(position => {
        if (this.within(position)) {
          this.cells[this.area.height - 1 - position.y][position.x].fill();
        }
      });
    });

    _defineProperty(this, "tick", () => {
      if (!this.currentTetrimino.moveDown()) {
        this.sediment.push(...this.currentTetrimino.occupiedPositions());
        this.currentTetrimino = new _tetrimino.default(this);
      }

      this.draw();
    });

    _defineProperty(this, "occupiable", position => {
      return this.within(position) && this.sediment.every(PieceOfSediment => !PieceOfSediment.equals(position));
    });

    _defineProperty(this, "within", position => {
      return 0 <= position.x && position.x <= this.area.width - 1 && 0 <= position.y && position.y <= this.area.height - 1;
    });

    _defineProperty(this, "moveTetriminoLeft", () => {
      this.currentTetrimino.moveLeft();
    });

    _defineProperty(this, "moveTetriminoRight", () => {
      this.currentTetrimino.moveRight();
    });

    _defineProperty(this, "rotateTetriminoClockwise", () => {
      this.currentTetrimino.rotateClockwise();
    });

    _defineProperty(this, "rotateTetriminoCounterClockwise", () => {
      this.currentTetrimino.rotateCounterClockwise();
    });

    this.elem = this.initialElem(this.area);
    this.cells = this.initialCells(this.area);
    parentElem.appendChild(this.elem);
    this.draw();
  }

}

var _default = Grid;
exports.default = _default;
},{"./cell":"b70b289d34d20a81da4fb8dad7a40876","./tetrimino":"f75ed70044904b7f08eae709cbe41b61","./area":"516a1e11b97b79da3c51b9dfeee5ea2a"}],"b70b289d34d20a81da4fb8dad7a40876":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const FILLED_COLOR = "#000000";
const EMPTY_COLOR = "#E0E0E0";

class CellOuter {
  constructor(parentElem) {
    _defineProperty(this, "initialElem", () => {
      const elem = document.createElement("li");
      elem.style.listStyle = "none";
      elem.style.width = "78%";
      elem.style.height = "78%";
      elem.style.border = "2px solid";
      elem.style.display = "flex";
      elem.style.justifyContent = "center";
      elem.style.alignItems = "center";
      return elem;
    });

    _defineProperty(this, "fill", () => {
      this.elem.style.borderColor = FILLED_COLOR;
      this.inner.fill();
    });

    _defineProperty(this, "clear", () => {
      this.elem.style.borderColor = EMPTY_COLOR;
      this.inner.clear();
    });

    this.elem = this.initialElem();
    this.inner = new CellInner(this.elem);
    parentElem.appendChild(this.elem);
  }

}

class CellInner {
  constructor(parentElem) {
    _defineProperty(this, "fill", () => {
      this.elem.style.backgroundColor = FILLED_COLOR;
    });

    _defineProperty(this, "clear", () => {
      this.elem.style.backgroundColor = EMPTY_COLOR;
    });

    this.elem = document.createElement("div");
    parentElem.appendChild(this.elem);
    this.elem.style.width = "75%";
    this.elem.style.height = "75%";
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

var _position = _interopRequireDefault(require("./position"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const shapeT = {
  patterns: [[[0, 0, 0, 0], [0, 0, 1, 0], [0, 1, 1, 1], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 0, 1, 0], [0, 0, 1, 1], [0, 0, 1, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 1, 1], [0, 0, 1, 0]], [[0, 0, 0, 0], [0, 0, 1, 0], [0, 1, 1, 0], [0, 0, 1, 0]]]
};
const shapeI = {
  patterns: [[[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]]
};
const shapeO = {
  patterns: [[[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]]
};
const shapeS = {
  patterns: [[[0, 0, 0, 0], [0, 0, 1, 1], [0, 1, 1, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0]]]
};
const shapeZ = {
  patterns: [[[0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0]]]
};
const shapeL = {
  patterns: [[[0, 0, 0, 0], [0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0]], [[1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]]]
};
const shapeJ = {
  patterns: [[[0, 0, 0, 0], [0, 1, 0, 0], [0, 1, 1, 1], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 1, 0, 0]], [[0, 0, 0, 0], [0, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 0]], [[0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 1, 1], [0, 0, 0, 0]]]
};
const shapes = [shapeT, shapeI, shapeO, shapeZ, shapeS, shapeL, shapeJ];

class Tetrimino {
  constructor(grid) {
    _defineProperty(this, "patternIndex", 0);

    _defineProperty(this, "currentPattern", () => {
      return this.shape.patterns[this.patternIndex];
    });

    _defineProperty(this, "occupiedPositions", () => {
      const positions = [];
      this.currentPattern().forEach((row, i) => row.forEach((cell, j) => {
        if (cell == 1) positions.push(new _position.default(this.position.x + j, this.position.y + (3 - i)));
      }));
      return positions;
    });

    _defineProperty(this, "moveDown", () => {
      return this.move(() => this.position = this.position.down(), () => this.position = this.position.up());
    });

    _defineProperty(this, "moveRight", () => {
      return this.move(() => this.position = this.position.right(), () => this.position = this.position.left());
    });

    _defineProperty(this, "moveLeft", () => {
      return this.move(() => this.position = this.position.left(), () => this.position = this.position.right());
    });

    _defineProperty(this, "rotateClockwise", () => {
      return this.move(this.incrementPatternIndex, this.decrementPatternIndex);
    });

    _defineProperty(this, "rotateCounterClockwise", () => {
      return this.move(this.decrementPatternIndex, this.incrementPatternIndex);
    });

    _defineProperty(this, "incrementPatternIndex", () => {
      this.patternIndex = (this.patternIndex + 1) % this.shape.patterns.length;
    });

    _defineProperty(this, "decrementPatternIndex", () => {
      this.patternIndex = (this.patternIndex + this.shape.patterns.length - 1) % this.shape.patterns.length;
    });

    _defineProperty(this, "move", (attempt, reset) => {
      attempt();

      if (!this.canBeIn(this.occupiedPositions())) {
        reset();
        return false;
      }

      return true;
    });

    _defineProperty(this, "canBeIn", positions => {
      return positions.every(this.grid.occupiable);
    });

    this.shape = shapes[Math.floor(Math.random() * shapes.length)];
    this.position = new _position.default((grid.area.width - this.shape.patterns[0].length) / 2, grid.area.height - this.shape.patterns[0].length / 2);
    this.grid = grid;
  }

}

var _default = Tetrimino;
exports.default = _default;
},{"./position":"471495f57cb7c4ce0f9427dac5bec78c"}],"471495f57cb7c4ce0f9427dac5bec78c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Position {
  constructor(x, y) {
    _defineProperty(this, "down", () => {
      return new Position(this.x, this.y - 1);
    });

    _defineProperty(this, "up", () => {
      return new Position(this.x, this.y + 1);
    });

    _defineProperty(this, "right", () => {
      return new Position(this.x + 1, this.y);
    });

    _defineProperty(this, "left", () => {
      return new Position(this.x - 1, this.y);
    });

    _defineProperty(this, "equals", opponent => {
      return this.x === opponent.x && this.y === opponent.y;
    });

    this.x = x;
    this.y = y;
  }

}

var _default = Position;
exports.default = _default;
},{}],"516a1e11b97b79da3c51b9dfeee5ea2a":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Area {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

}

var _default = Area;
exports.default = _default;
},{}]},{},["1a939072b57cebe75842efe0ba75e6bd","1b4b89b226e7f55d440fa57f9fc4860c"], null)

//# sourceMappingURL=ts.8ace36bc.js.map
