"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.App = undefined;

var _angular = require("angular2/angular2");

var _router = require("angular2/router");

var _page = require("../page1/page1");

var _page2 = require("../page2/page2");

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
var App = exports.App = function App(location, router) {
    _classCallCheck(this, App);

    this.state = "state";
    this.locaton = location;
    this.router = router;
};
exports.App = App = __decorate([(0, _angular.Component)({
    selector: 'my-app',
    template: "\n    <div class=\"row\">\n      <div>{{state}}</div>\n    </div>\n    <div class=\"row\">\n      <ul>\n        <li><a [router-link]=\"['/Page1']\">PAGE1</a></li>\n        <li><a [router-link]=\"['/Page2']\">PAGE2</a></li>\n      </ul>\n    </div>\n    <router-outlet></router-outlet>\n  ",
    directives: [_page.Page1, _page2.Page2, _router.ROUTER_DIRECTIVES, _router.RouterLink, _router.RouterOutlet]
}), (0, _router.RouteConfig)([new _router.Route({ path: '/p1', component: _page.Page1, name: 'Page1' }), new _router.Route({ path: '/p2', component: _page2.Page2, name: 'Page2' })]), __metadata('design:paramtypes', [typeof (_a = typeof _router.Location !== 'undefined' && _router.Location) === 'function' && _a || Object, typeof (_b = typeof _router.Router !== 'undefined' && _router.Router) === 'function' && _b || Object])], App);
(0, _angular.bootstrap)(App, [_router.ROUTER_PROVIDERS, (0, _angular.provide)(_router.LocationStrategy, { useClass: _router.HashLocationStrategy })]).catch(function (err) {
    return console.error(err);
});
var _a, _b;