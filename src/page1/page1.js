"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Page1 = undefined;

var _angular = require("angular2/angular2");

var _router = require("angular2/router");

var _parent = require("../app/parent");

var _page = require("../page2/page2");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

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

var componentSelector = 'my-page1';
var _Page = (function (_Parent) {
    _inherits(Page1, _Parent);

    function Page1() {
        _classCallCheck(this, Page1);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Page1).call(this));

        _this.isRouterActive = false;
        _this.state = "state";
        console.log(componentSelector + " constructor");
        //this.init();
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
            if (!_Page.isJQueryPluginsInitialized) _Page.isJQueryPluginsInitialized = this.initJQueryPlugins(componentSelector);
        }
    }, {
        key: "nowTime",
        get: function get() {
            return (0, _moment2.default)().format();
        }
    }, {
        key: "value",
        get: function get() {
            return Math.pow(2, 4);
        }
    }]);

    return Page1;
})(_parent.Parent);
exports.Page1 = _Page;
_Page.isJQueryPluginsInitialized = false;
exports.Page1 = _Page = __decorate([(0, _angular.Component)({
    selector: componentSelector,
    template: "\n    <div class=\"row\">\n      <h2>Page1</h2>\n      {{nowTime}}\n      {{value}}\n      {{state}}\n    </div>\n    <div class=\"row\">\n      <div class=\"col s12 m6\">\n        <div class=\"card blue-grey darken-1\">\n          <div class=\"card-content white-text\">\n            <span class=\"card-title\">Card Title</span>\n            <p>I am a very simple card. I am good at containing small bits of information.\n            I am convenient because I require little markup to use effectively.</p>\n          </div>\n          <div class=\"card-action\">\n            <a [router-link]=\"['/Page2']\">This is a link</a>\n            <a [router-link]=\"['/Page2']\">This is a link</a>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <!-- Modal Trigger -->\n      <a class=\"waves-effect waves-light btn modal-trigger\" href=\"#modal1\">Modal</a>\n\n      <!-- Modal Structure -->\n      <div id=\"modal1\" class=\"modal\">\n        <div class=\"modal-content\">\n          <h4>Modal Header Page1</h4>\n          <p>A bunch of text</p>\n          <h2>{{nowTime}}</h2>\n        </div>\n        <div class=\"modal-footer\">\n          <a class=\" modal-action modal-close waves-effect waves-green btn-flat\">Agree</a>\n        </div>\n      </div>\n    </div>\n  ",
    directives: [_page.Page2, _router.ROUTER_DIRECTIVES]
}), __metadata('design:paramtypes', [])], _Page);