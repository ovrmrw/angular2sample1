"use strict";

var _angular = require("angular2/angular2");

var _router = require("angular2/router");

var _app = require("./app");

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

describe('aaa', function () {
    var app = undefined;
    beforeEach(function (done) {
        (0, _angular.bootstrap)(_app.App, [_router.ROUTER_PROVIDERS, (0, _angular.provide)(_router.LocationStrategy, { useClass: _router.HashLocationStrategy })]).then(function (result) {
            console.log(result);
            return result.instance;
        }).then(function (instance) {
            console.log(instance.router._outlet._componentRef);
            app = instance;
            done();
        }).catch(function (err) {
            return console.error(err);
        });
    });
    it('test', function () {
        console.log(app);
        expect(app.state).toEqual("state");
    });
});