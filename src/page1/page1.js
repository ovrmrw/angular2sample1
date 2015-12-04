"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Page1 = undefined;

var _angular = require("angular2/angular2");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var componentSelector = 'my-page1';
var _Page = (function () {
    function Page1() {
        _classCallCheck(this, Page1);

        this.state = "state";
        console.log(componentSelector + " constructor");
        //this.init();
    }

    _createClass(Page1, [{
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
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    console.log('async start');
                                    if (!_Page.isJQueryPluginsInitialized) {
                                        // for (let i = 0; i < 100; i++) {
                                        //   if ('$' in window) {
                                        //     break;
                                        //   } else {
                                        //     console.log('$ not in window');
                                        //     await new Promise(resolve => {
                                        //       setTimeout(() => { resolve() }, 100);
                                        //     });
                                        //   }
                                        // }
                                        console.log(componentSelector + " jquery initialized");
                                        $(componentSelector + " .modal-trigger").leanModal();
                                        _Page.isJQueryPluginsInitialized = true;
                                    }
                                    console.log('async end');

                                case 3:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            })();
        }
    }, {
        key: "nowTime",
        get: function get() {
            return (0, _moment2.default)().format();
        }
    }, {
        key: "value",
        get: function get() {
            return Math.pow(2, 1);
        }
    }]);

    return Page1;
})();
exports.Page1 = _Page;
_Page.isJQueryPluginsInitialized = false;
exports.Page1 = _Page = __decorate([(0, _angular.Component)({
    selector: componentSelector,
    template: "\n    <div class=\"row\">\n      <h2>Page1</h2>\n      {{nowTime}}\n      {{value}}\n      {{state}}\n    </div>\n    <div class=\"row\">\n      <!-- Modal Trigger -->\n      <a class=\"waves-effect waves-light btn modal-trigger\" href=\"#modal1\">Modal</a>\n\n      <!-- Modal Structure -->\n      <div id=\"modal1\" class=\"modal\">\n        <div class=\"modal-content\">\n          <h4>Modal Header Page1</h4>\n          <p>A bunch of text</p>\n          <h2>{{nowTime}}</h2>\n        </div>\n        <div class=\"modal-footer\">\n          <a href=\"#!\" class=\" modal-action modal-close waves-effect waves-green btn-flat\">Agree</a>\n        </div>\n      </div>\n    </div>\n  "
}), __metadata('design:paramtypes', [])], _Page);