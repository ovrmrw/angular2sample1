"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AppPage2 = undefined;

var _angular = require("angular2/angular2");

var _appParent = require("../app/app-parent");

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

var componentSelector = 'my-page2';
var AppPage2 = exports.AppPage2 = (function (_AppParent) {
    _inherits(AppPage2, _AppParent);

    function AppPage2() {
        _classCallCheck(this, AppPage2);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AppPage2).call(this));

        console.log(componentSelector + " constructor");
        return _this;
    }

    _createClass(AppPage2, [{
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
            _get(Object.getPrototypeOf(AppPage2.prototype), "initPluginsAndObservables", this).call(this, componentSelector);
        }
    }, {
        key: "routerOnDeactivate",
        value: function routerOnDeactivate() {
            _get(Object.getPrototypeOf(AppPage2.prototype), "routerOnDeactivate", this).call(this);
        }
    }, {
        key: "initializableJQueryPlugins",
        value: function initializableJQueryPlugins() {
            $(componentSelector + " .modal-trigger").leanModal();
        }
    }, {
        key: "initializableEventObservables",
        value: function initializableEventObservables() {
            this.disposableSubscription = _angular.Observable.fromEvent(document, 'click').map(function (event) {
                return event.target.textContent;
            }).filter(function (text) {
                return _.trim(text).length > 0;
            }).subscribe(function (text) {
                console.log(componentSelector + " " + text);
                Materialize.toast("You clicked \"" + text + "\"", 1000);
            });
        }
    }]);

    return AppPage2;
})(_appParent.AppParent);
exports.AppPage2 = AppPage2 = __decorate([(0, _angular.Component)({
    selector: componentSelector,
    template: "\n    <div class=\"row\">\n      <div class=\"col s12\">\n        <h3>Other Pages</h3>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col s12\">\n        <!-- Modal Trigger -->\n        <a class=\"waves-effect waves-light btn modal-trigger\" href=\"#modal1\">Push this button</a>\n  \n        <!-- Modal Structure -->\n        <div id=\"modal1\" class=\"modal\">\n          <div class=\"modal-content\">\n            <h4>Modal Title</h4>\n            <p>このページには何もありません。</p>\n            <p>Card Listのページに戻ってjqueryプラグインとイベントハンドラが正常動作することを確認してください。</p>\n          </div>\n          <div class=\"modal-footer\">\n            <a class=\" modal-action modal-close waves-effect waves-green btn-flat\">OK</a>\n          </div>\n        </div>\n      </div>\n    </div>\n  "
}), __metadata('design:paramtypes', [])], AppPage2);