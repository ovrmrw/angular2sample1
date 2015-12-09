"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Page2 = undefined;

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
var Page2 = exports.Page2 = (function (_AppParent) {
    _inherits(Page2, _AppParent);

    function Page2() {
        _classCallCheck(this, Page2);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Page2).call(this));

        console.log(componentSelector + " constructor");
        return _this;
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
            _get(Object.getPrototypeOf(Page2.prototype), "initPluginsAndObservables", this).call(this, componentSelector);
        }
    }, {
        key: "routerOnDeactivate",
        value: function routerOnDeactivate() {
            _get(Object.getPrototypeOf(Page2.prototype), "routerOnDeactivate", this).call(this);
        }
    }, {
        key: "initializableJQueryPlugins",
        value: function initializableJQueryPlugins() {
            $(componentSelector + " .modal-trigger").leanModal();
        }
    }, {
        key: "initializableEventObservables",
        value: function initializableEventObservables() {}
    }]);

    return Page2;
})(_appParent.AppParent);
exports.Page2 = Page2 = __decorate([(0, _angular.Component)({
    selector: componentSelector,
    template: "\n    <div class=\"row\">\n      <h2>Card Editor</h2>\n    </div>\n    <div class=\"row\">\n      <!-- Modal Trigger -->\n      <a class=\"waves-effect waves-light btn modal-trigger\" href=\"#modal1\">Modal</a>\n\n      <!-- Modal Structure -->\n      <div id=\"modal1\" class=\"modal\">\n        <div class=\"modal-content\">\n          <h4>Modal Header Page2</h4>\n          <p>A bunch of text</p>\n        </div>\n        <div class=\"modal-footer\">\n          <a class=\" modal-action modal-close waves-effect waves-green btn-flat\">Agree</a>\n        </div>\n      </div>\n    </div>\n  "
}), __metadata('design:paramtypes', [])], Page2);