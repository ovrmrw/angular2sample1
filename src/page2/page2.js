"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Page2 = undefined;

var _angular = require("angular2/angular2");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) {
            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
                resolve(value);
            });
        }
        function onfulfill(value) {
            try {
                step("next", value);
            } catch (e) {
                reject(e);
            }
        }
        function onreject(value) {
            try {
                step("throw", value);
            } catch (e) {
                reject(e);
            }
        }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};

var componentSelector = 'my-page2';
var _Page = (function () {
    function Page2() {
        _classCallCheck(this, Page2);

        console.log(componentSelector + " constructor");
        //this.init();
    }

    _createClass(Page2, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            console.log(componentSelector + " onInit");
        }
    }, {
        key: "ngAfterContentInit",
        value: function ngAfterContentInit() {
            console.log(componentSelector + " afterContentInit");
        }
    }, {
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
            console.log(componentSelector + " afterViewInit");
            this.initJQueryPlugins();
        }
    }, {
        key: "initJQueryPlugins",
        value: function initJQueryPlugins() {
            var _this = this;

            (function () {
                return __awaiter(_this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
                    var i;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    console.log('async start');

                                    if (_Page.isJQueryPluginsInitialized) {
                                        _context.next = 17;
                                        break;
                                    }

                                    i = 0;

                                case 3:
                                    if (!(i < 100)) {
                                        _context.next = 14;
                                        break;
                                    }

                                    if (!('$' in window)) {
                                        _context.next = 8;
                                        break;
                                    }

                                    return _context.abrupt("break", 14);

                                case 8:
                                    console.log('$ not in window');
                                    _context.next = 11;
                                    return new Promise(function (resolve) {
                                        setTimeout(function () {
                                            resolve();
                                        }, 100);
                                    });

                                case 11:
                                    i++;
                                    _context.next = 3;
                                    break;

                                case 14:
                                    console.log(componentSelector + " jquery initialized");
                                    $(componentSelector + " .modal-trigger").leanModal();
                                    _Page.isJQueryPluginsInitialized = true;

                                case 17:
                                    console.log('async end');

                                case 18:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            })();
        }
    }]);

    return Page2;
})();
exports.Page2 = _Page;
_Page.isJQueryPluginsInitialized = false;
exports.Page2 = _Page = __decorate([(0, _angular.Component)({
    selector: componentSelector,
    template: "\n    <div class=\"row\">\n      <h2>Page2</h2>\n    </div>\n    <div class=\"row\">\n      <!-- Modal Trigger -->\n      <a class=\"waves-effect waves-light btn modal-trigger\" href=\"#modal1\">Modal</a>\n\n      <!-- Modal Structure -->\n      <div id=\"modal1\" class=\"modal\">\n        <div class=\"modal-content\">\n          <h4>Modal Header Page2</h4>\n          <p>A bunch of text</p>\n        </div>\n        <div class=\"modal-footer\">\n          <a href=\"#!\" class=\" modal-action modal-close waves-effect waves-green btn-flat\">Agree</a>\n        </div>\n      </div>\n    </div>\n  "
}), __metadata('design:paramtypes', [])], _Page);