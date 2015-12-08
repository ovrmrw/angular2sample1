'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
            this._disposableSubscriptions = [];
        }
    }, {
        key: 'isJQueryPluginsInitialized',
        get: function get() {
            return AppParent._isJQueryPluginsInitialized;
        },
        set: function set(flag) {
            AppParent._isJQueryPluginsInitialized = flag;
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

AppParent._isJQueryPluginsInitialized = false;