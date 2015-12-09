"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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
var App = exports.App = (function () {
    function App(location, router) {
        _classCallCheck(this, App);

        this.location = location;
        this.router = router;
    }

    _createClass(App, [{
        key: "getLinkStyle",
        value: function getLinkStyle(path) {
            if (path === this.location.path()) {
                return true;
            } else if (path.length > 0) {
                return this.location.path().indexOf(path) > -1;
            }
        }
    }]);

    return App;
})();
exports.App = App = __decorate([(0, _angular.Component)({
    selector: 'my-app',
    template: "\n    <nav>\n      <div class=\"nav-wrapper\">\n        <a href=\"#\" class=\"brand-logo right\">Angular2 Sample1</a>\n        <ul id=\"nav-mobile\" class=\"left hide-on-small-and-down\">\n          <li id=\"nav1\" [class.active]=\"getLinkStyle('/p1')\"><a [router-link]=\"['/Page1']\" class=\"waves-effect waves-light\"><i class=\"material-icons left\">view_module</i>Card List</a></li>\n          <li id=\"nav2\" [class.active]=\"getLinkStyle('/p2')\"><a [router-link]=\"['/Page2']\" class=\"waves-effect waves-light\"><i class=\"material-icons left\">description</i>Other Pages</a></li>\n        </ul>\n      </div>\n    </nav>\n    <router-outlet></router-outlet>\n    <footer class=\"page-footer\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col l6 s12\">\n            <h5 class=\"white-text\">Footer Content</h5>\n            <p class=\"grey-text text-lighten-4\">You can use rows and columns here to organize your footer content.</p>\n          </div>\n          <div class=\"col l4 offset-l2 s12\">\n            <h5 class=\"white-text\">Links</h5>\n            <ul>\n              <li><a class=\"grey-text text-lighten-3\" href=\"#!\">Link 1</a></li>\n              <li><a class=\"grey-text text-lighten-3\" href=\"#!\">Link 2</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n      <div class=\"footer-copyright\">\n        <div class=\"container\">\n        © 2015 Copyright Text\n        <a class=\"grey-text text-lighten-4 right\" href=\"#!\">More Links</a>\n        </div>\n      </div>\n    </footer>\n  ",
    directives: [_page.Page1, _page2.Page2, _router.ROUTER_DIRECTIVES]
}), (0, _router.RouteConfig)([new _router.Route({ path: '/p1', component: _page.Page1, name: 'Page1', useAsDefault: true }), new _router.Route({ path: '/p2', component: _page2.Page2, name: 'Page2' })]), __metadata('design:paramtypes', [typeof (_a = typeof _router.Location !== 'undefined' && _router.Location) === 'function' && _a || Object, typeof (_b = typeof _router.Router !== 'undefined' && _router.Router) === 'function' && _b || Object])], App);
(0, _angular.bootstrap)(App, [_router.ROUTER_PROVIDERS, (0, _angular.provide)(_router.LocationStrategy, { useClass: _router.HashLocationStrategy })]);
var _a, _b;