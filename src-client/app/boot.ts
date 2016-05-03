// プログラムのエントリーポイント。index.htmlから呼び出される。

// import 'zone.js/dist/zone';
import {provide, enableProdMode} from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {App} from './app'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/debounce'
import 'rxjs/add/operator/toPromise'

enableProdMode();
bootstrap(App, [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);