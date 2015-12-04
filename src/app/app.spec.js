'use strict';

var _angular = require('angular2/angular2');

var _router = require('angular2/router');

var _app = require('./app');

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