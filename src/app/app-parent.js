'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AppParent = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppParent = exports.AppParent = (function () {
    function AppParent() {
        _classCallCheck(this, AppParent);

        this._disposableSubscriptions = [];
    }

    _createClass(AppParent, [{
        key: 'routerOnDeactivate',
        value: function routerOnDeactivate() {
            console.log('dispose subscriptions');
            this.disposeSubscriptions();
        }
    }, {
        key: 'disposeSubscriptions',
        value: function disposeSubscriptions() {
            this.disposableSubscriptions.forEach(function (subscription) {
                if (!subscription.isUnsubscribed) {
                    subscription.unsubscribe();
                }
            });
        }
    }, {
        key: 'initPluginsAndObservables',
        value: function initPluginsAndObservables(selector) {
            if (_lodash2.default.indexOf(this.initializedJQueryPluginSelectors, selector) === -1) {
                this.initializableJQueryPlugins();
                this.initializedJQueryPluginSelector = selector;
            }
            this.initializableEventObservables();
        }
    }, {
        key: 'initializedJQueryPluginSelectors',
        get: function get() {
            return AppParent._initializedJQueryPluginSelectors;
        }
    }, {
        key: 'initializedJQueryPluginSelector',
        set: function set(selector) {
            AppParent._initializedJQueryPluginSelectors.push(selector);
        }
    }, {
        key: 'disposableSubscriptions',
        get: function get() {
            return this._disposableSubscriptions;
        }
    }, {
        key: 'disposableSubscription',
        set: function set(subscription) {
            this._disposableSubscriptions.push(subscription);
        }
    }]);

    return AppParent;
})();

AppParent._initializedJQueryPluginSelectors = [];