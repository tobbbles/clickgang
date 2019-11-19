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
/******/ 	return __webpack_require__(__webpack_require__.s = "./ui/src/App.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ui/src/App.ts":
/*!***********************!*\
  !*** ./ui/src/App.ts ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Game */ "./ui/src/components/Game.ts");

var game = new _components_Game__WEBPACK_IMPORTED_MODULE_0__["default"]();
game.connect();


/***/ }),

/***/ "./ui/src/components/Connection.ts":
/*!*****************************************!*\
  !*** ./ui/src/components/Connection.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Event */ "./ui/src/components/Event.ts");

var ConnectionManager = /** @class */ (function () {
    function ConnectionManager(url) {
        if (!url) {
            throw new Error('missing websocket url');
        }
        this.connection = new WebSocket(url);
        this.connection.onerror = function (ev) {
            throw new Error("Websocket connection error: " + ev);
        };
        this.connection.onmessage = function (ev) {
            var rcv = JSON.parse(ev.data);
            console.log(rcv);
        };
    }
    // TODO: How do we implement a request/response model with callbacks over WS?
    ConnectionManager.prototype.request = function (e, cb) {
        // this.
    };
    ConnectionManager.prototype.Player = function () {
        var ev = new _Event__WEBPACK_IMPORTED_MODULE_0__["Event"](_Event__WEBPACK_IMPORTED_MODULE_0__["EventType"].Connect);
        this.request(ev, null);
        return null;
    };
    return ConnectionManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (ConnectionManager);
var Disconnect = function (ev) {
    // this.send()
};


/***/ }),

/***/ "./ui/src/components/Event.ts":
/*!************************************!*\
  !*** ./ui/src/components/Event.ts ***!
  \************************************/
/*! exports provided: EventType, Event */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventType", function() { return EventType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var EventType;
(function (EventType) {
    EventType["Connect"] = "connect";
    EventType["Disconnect"] = "disconnect";
})(EventType || (EventType = {}));
var Event = /** @class */ (function () {
    function Event(event, player, data) {
        this.payload = {
            event: event,
            timestamp: new Date().toISOString(),
            id: player.id,
            data: __assign({}, data)
        };
        console.groupCollapsed("Send: " + event);
        console.log(this.payload);
        console.groupEnd();
    }
    Event.prototype.stringify = function () {
        return JSON.stringify(this.payload);
    };
    return Event;
}());



/***/ }),

/***/ "./ui/src/components/Game.ts":
/*!***********************************!*\
  !*** ./ui/src/components/Game.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _State__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./State */ "./ui/src/components/State.ts");
/* harmony import */ var _Connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Connection */ "./ui/src/components/Connection.ts");


var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.state = new _State__WEBPACK_IMPORTED_MODULE_0__["default"]();
        window.addEventListener('beforeunload', function () {
            var player = _this.state.player;
            if (player && _this.connection) {
                // let e: Event = new Event(EventType.Disconnect, player)
            }
        });
    }
    Game.prototype.connect = function () {
        this.connection = new _Connection__WEBPACK_IMPORTED_MODULE_1__["default"]('ws://localhost:3117/game');
    };
    //
    //      Connection Handlers
    //
    Game.prototype.DisconnectHandler = function (serverTriggered) {
        if (serverTriggered) {
            console.log('server triggered disconnect');
        }
        else {
            console.log('disconnect');
        }
    };
    return Game;
}());
/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),

/***/ "./ui/src/components/State.ts":
/*!************************************!*\
  !*** ./ui/src/components/State.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var State = /** @class */ (function () {
    function State() {
    }
    return State;
}());
/* harmony default export */ __webpack_exports__["default"] = (State);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vdWkvc3JjL0FwcC50cyIsIndlYnBhY2s6Ly8vLi91aS9zcmMvY29tcG9uZW50cy9Db25uZWN0aW9uLnRzIiwid2VicGFjazovLy8uL3VpL3NyYy9jb21wb25lbnRzL0V2ZW50LnRzIiwid2VicGFjazovLy8uL3VpL3NyYy9jb21wb25lbnRzL0dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vdWkvc3JjL2NvbXBvbmVudHMvU3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pGQTtBQUFBO0FBQXFDO0FBRXJDLElBQUksSUFBSSxHQUFTLElBQUksd0RBQUksRUFBRSxDQUFDO0FBQzVCLElBQUksQ0FBQyxPQUFPLEVBQUU7Ozs7Ozs7Ozs7Ozs7QUNKZDtBQUFBO0FBQWdEO0FBU2hEO0lBSUksMkJBQVks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Q0FBQyxZQUFZLENBQUMsQ0FBQztTQUM3QjtJQUNMLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNuQ0Q7QUFBQTtJQUFBO0lBRUEsQ0FBQztJQUFELFlBQUM7QUFBRCxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vdWkvc3JjL0FwcC50c1wiKTtcbiIsIlxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vY29tcG9uZW50cy9HYW1lXCI7XG5cbmxldCBnYW1lOiBHYW1lID0gbmV3IEdhbWUoKTtcbmdhbWUuY29ubmVjdCgpIiwiaW1wb3J0IHsgRXZlbnQgYXMgRSwgRXZlbnRUeXBlIH0gZnJvbSBcIi4vRXZlbnRcIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCI7XG5cbi8vIE1ha2UgY29ubmVjdGlvbiB3aXRoIGhhbmRsZXJzIGFuZCByb3V0ZXIgd2l0aCBjYWxsYmFjayBmdW5jc1xudHlwZSBNZXNzYWdlPFQ+ID0ge1xuICAgIGV2ZW50OiBFdmVudFR5cGVcbiAgICBkYXRhOiBUXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbm5lY3Rpb25NYW5hZ2VyIHtcbiAgICByZWFkb25seSBjb25uZWN0aW9uOiBXZWJTb2NrZXRcbiAgICByZWFkb25seSBoYW5kbGVyczogSGFuZGxlcltdXG5cbiAgICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZykge1xuICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIHdlYnNvY2tldCB1cmwnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBuZXcgV2ViU29ja2V0KHVybCk7XG4gICAgICAgIFxuXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbmVycm9yID0gKGV2OiBFdmVudCk6IGFueSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFdlYnNvY2tldCBjb25uZWN0aW9uIGVycm9yOiAke2V2fWApO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbm1lc3NhZ2UgPSAoZXY6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmN2ID0gPE1lc3NhZ2U8b2JqZWN0Pj5KU09OLnBhcnNlKGV2LmRhdGEpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyY3YpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE9ETzogSG93IGRvIHdlIGltcGxlbWVudCBhIHJlcXVlc3QvcmVzcG9uc2UgbW9kZWwgd2l0aCBjYWxsYmFja3Mgb3ZlciBXUz9cbiAgICByZXF1ZXN0KGU6IEUsIGNiOiBGdW5jdGlvbikge1xuICAgICAgICAvLyB0aGlzLlxuICAgIH1cblxuICAgIFBsYXllcigpOiBQbGF5ZXIge1xuICAgICAgICBsZXQgZXY6IEUgPSBuZXcgRShFdmVudFR5cGUuQ29ubmVjdCk7XG5cbiAgICAgICAgdGhpcy5yZXF1ZXN0KGV2LCBudWxsKVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cblxuaW50ZXJmYWNlIEhhbmRsZXIge1xuICAgIG5hbWU6IHN0cmluZ1xuXG4gICAgKHRoaXM6IFdlYlNvY2tldCwgZXY6IENsb3NlRXZlbnQpOiBhbnlcbn1cblxuY29uc3QgRGlzY29ubmVjdCA9IGZ1bmN0aW9uICh0aGlzOiBXZWJTb2NrZXQsIGV2OiBFdmVudCk6IGFueSB7XG4gICAgLy8gdGhpcy5zZW5kKClcbn0iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiO1xuXG5leHBvcnQgZW51bSBFdmVudFR5cGUge1xuICAgIENvbm5lY3QgPSAnY29ubmVjdCcsXG4gICAgRGlzY29ubmVjdCA9ICdkaXNjb25uZWN0J1xufVxuXG5leHBvcnQgY2xhc3MgRXZlbnQge1xuICAgIHBheWxvYWQ6IG9iamVjdFxuXG4gICAgY29uc3RydWN0b3IoZXZlbnQ6IHN0cmluZywgcGxheWVyPzogUGxheWVyLCBkYXRhPzogb2JqZWN0KSB7XG5cbiAgICAgICAgdGhpcy5wYXlsb2FkID0ge1xuICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICAgIGlkOiBwbGF5ZXIuaWQsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgLi4uZGF0YVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoYFNlbmQ6ICR7ZXZlbnR9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGF5bG9hZCk7XG4gICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICB9XG5cbiAgICBzdHJpbmdpZnkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMucGF5bG9hZCk7XG4gICAgfVxufSIsImltcG9ydCBTdGF0ZSBmcm9tIFwiLi9TdGF0ZVwiXG5pbXBvcnQge0V2ZW50LCBFdmVudFR5cGV9IGZyb20gXCIuL0V2ZW50XCJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCI7XG5pbXBvcnQgQ29ubmVjdGlvbk1hbmFnZXIgZnJvbSBcIi4vQ29ubmVjdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgICBjb25uZWN0aW9uOiBDb25uZWN0aW9uTWFuYWdlclxuICAgIHN0YXRlOiBTdGF0ZVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBuZXcgU3RhdGUoKTtcbiAgICAgICAgXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5zdGF0ZS5wbGF5ZXI7XG5cbiAgICAgICAgICAgIGlmIChwbGF5ZXIgJiYgdGhpcy5jb25uZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy8gbGV0IGU6IEV2ZW50ID0gbmV3IEV2ZW50KEV2ZW50VHlwZS5EaXNjb25uZWN0LCBwbGF5ZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgdGhpcy5jb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb25NYW5hZ2VyKCd3czovL2xvY2FsaG9zdDozMTE3L2dhbWUnKTtcbiAgICB9XG5cblxuICAgIC8vXG4gICAgLy8gICAgICBDb25uZWN0aW9uIEhhbmRsZXJzXG4gICAgLy9cblxuICAgIERpc2Nvbm5lY3RIYW5kbGVyKHNlcnZlclRyaWdnZXJlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAoc2VydmVyVHJpZ2dlcmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2VydmVyIHRyaWdnZXJlZCBkaXNjb25uZWN0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZGlzY29ubmVjdCcpO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRlIHtcbiAgICBwbGF5ZXI6IFBsYXllclxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==