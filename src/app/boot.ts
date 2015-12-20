// プログラムのエントリーポイント。index.htmlから呼び出される。

import {provide} from 'angular2/core'
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router'
import {bootstrap} from 'angular2/platform/browser'
import {App} from './app'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/debounce'
import 'rxjs/add/operator/toPromise'

bootstrap(App, [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);