"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Page1 = undefined;

var _angular = require("angular2/angular2");

var _router = require("angular2/router");

var _http = require("angular2/http");

var _appParent = require("../app/app-parent");

var _page = require("../page2/page2");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var _Page = (function (_AppParent) {
    _inherits(Page1, _AppParent);

    function Page1(http) {
        _classCallCheck(this, Page1);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Page1).call(this));

        _this.http = http;
        _this.cards = [];
        console.log(componentSelector + " constructor");
        return _this;
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
            this.initEventObservables();
            if (!this.isJQueryPluginsInitialized) {
                this.initJQueryPlugins();
                this.isJQueryPluginsInitialized = true;
            }
            this.loadCards(this.searchWord);
            document.querySelector('.firstFocus')[0].focus();
        }
    }, {
        key: "routerCanDeactivate",
        value: function routerCanDeactivate(next, prev) {
            //return confirm('Are you sure you want to leave?');   
        }
    }, {
        key: "routerOnDeactivate",
        value: function routerOnDeactivate() {
            _get(Object.getPrototypeOf(Page1.prototype), "routerOnDeactivate", this).call(this);
        }
    }, {
        key: "loadCards",
        value: function loadCards() {
            var _this2 = this;

            var searchWord = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

            (function () {
                return __awaiter(_this2, void 0, Promise, regeneratorRuntime.mark(function _callee() {
                    var cards, words;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return this.http.get('/cards.json').map(function (res) {
                                        return res.json();
                                    }).toPromise(Promise);

                                case 2:
                                    cards = _context.sent;

                                    if (searchWord) {
                                        words = _lodash2.default.words(searchWord);

                                        words.forEach(function (word) {
                                            cards = _lodash2.default.filter(cards, function (card) {
                                                return card.title.indexOf(word) > -1 || card.body.indexOf(word) > -1;
                                            });
                                        });
                                    }
                                    this.cards = cards;

                                case 5:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            })();
        }
    }, {
        key: "initJQueryPlugins",
        value: function initJQueryPlugins() {
            $(componentSelector + " .modal-trigger").leanModal();
        }
    }, {
        key: "initEventObservables",
        value: function initEventObservables() {
            var _this3 = this;

            this.disposableSubscription = _angular.Observable.fromEvent(document.getElementById('searchWord'), 'keyup').map(function (event) {
                return event.target.value;
            }).debounce(function () {
                return _angular.Observable.timer(1000);
            }).subscribe(function (value) {
                _this3.loadCards(value);
                Materialize.toast("Searching with word '" + value + "' triggered", 2000);
            });
        }
    }, {
        key: "searchWord",
        get: function get() {
            return _Page._searchWord;
        },
        set: function set(word) {
            _Page._searchWord = word;
        }
    }]);

    return Page1;
})(_appParent.AppParent);
exports.Page1 = _Page;
_Page._searchWord = '';
exports.Page1 = _Page = __decorate([(0, _angular.Component)({
    selector: componentSelector,
    template: "\n    <div class=\"row\">\n      <div class=\"col s12 m12 l4\">\n        <h3>Card List</h3>\n      </div>\n      <form class=\"col s12 m12 l8\">\n        <div class=\"row\">\n          <div class=\"input-field col s12\">\n            <!-- <input id=\"searchWord\" type=\"text\" class=\"validate firstFocus\" (keyup)=\"onChangeWord($event)\"> -->\n            <input id=\"searchWord\" [(ng-model)]=\"searchWord\" type=\"text\" class=\"validate\">\n            <label for=\"searchWord\">Search Word</label>\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class=\"row\" *ng-if=\"cards && cards.length > 0\">\n      <div class=\"col s6 m4 l3\" *ng-for=\"#card of cards\">\n        <div class=\"card orange darken-2 waves-effect waves-light\" [router-link]=\"['/Page2']\">\n          <div class=\"card-content white-text\">\n            <span class=\"card-title\">{{card.title}}</span>\n            <p>{{card.body}}</p>\n          </div>\n          <div class=\"card-action\">\n            <a [router-link]=\"['/Page2']\">Card Editor</a>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"row\" *ng-if=\"cards && cards.length == 0\">\n      <div class=\"col s12\">\n        <h3 class=\"pink lighten-2 white-text\">No Results</h3>\n      </div>\n    </div>\n    <div class=\"row\">\n      <!-- Modal Trigger -->\n      <a class=\"waves-effect waves-light btn modal-trigger\" href=\"#modal1\">Modal</a>\n\n      <!-- Modal Structure -->\n      <div id=\"modal1\" class=\"modal\">\n        <div class=\"modal-content\">\n          <h4>Modal Header Page1</h4>\n          <p>A bunch of text</p>\n          <h2>{{nowTime}}</h2>\n        </div>\n        <div class=\"modal-footer\">\n          <a class=\" modal-action modal-close waves-effect waves-green btn-flat\">Agree</a>\n        </div>\n      </div>\n    </div>\n  ",
    directives: [_page.Page2, _router.ROUTER_DIRECTIVES],
    providers: [_http.HTTP_PROVIDERS]
}), __metadata('design:paramtypes', [typeof (_a = typeof _http.Http !== 'undefined' && _http.Http) === 'function' && _a || Object])], _Page);
var _a;