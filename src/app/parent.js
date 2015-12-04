"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parent = exports.Parent = (function () {
    function Parent() {
        _classCallCheck(this, Parent);
    }

    _createClass(Parent, [{
        key: "initJQueryPlugins",
        value: function initJQueryPlugins(selector) {
            //(async() => {
            //console.log('async start')
            //if (!flag) {
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
            console.log(selector + " jquery initialized");
            $(selector + " .modal-trigger").leanModal();
            //flag = true;
            //}
            //console.log('async end')
            return true;
            //})();
        }
    }]);

    return Parent;
})();