title: Angular2の実践的なビューの作り方

## Angular2, TypeScript, Abstract Class

今回はabstract classを継承し、余計な処理を可能な限りabstract classに追放する書き方をしてみたいと思います。

```javascript
// app-parent.ts

export abstract class AppParent {
}
```
```javascript
// app-page1.ts

import {Component} from 'angular2/angular2'

const componentSelector = 'app-page1';

@Component({
  selector: componentSelector,
  template: `  
  `
})
export class AppPage1 extends AppParent {
}
```
`AppPage1`子クラス、はabstractな`AppParent`親クラスを継承します。  
abstractな関数を宣言する予定なので、クラスもabstractを付けなければいけません。

---

2222222222222222222222222222222222222222222222222222222222222222222222222
```javascript
// app-parent.ts

export abstract class AppParent {
  // 追加ここから
  private static _initializedJQueryPluginSelectors: string[] = [];
  private get initializedJQueryPluginSelectors() {
    return AppParent._initializedJQueryPluginSelectors;
  }
  private set initializedJQueryPluginSelector(selector: string) {
    AppParent._initializedJQueryPluginSelectors.push(selector);
  }
  
  protected abstract initializableJQueryPlugins(): void;
  // 追加ここまで
}
```
```javascript
// app-page1.ts

import {Component} from 'angular2/angular2'

const componentSelector = 'app-page1';

@Component({
  selector: componentSelector,
  template: `  
    <div id="datepicker"></div>
    <div id="dialog"></div>
  `
})
export class AppPage1 extends AppParent {
  // 追加ここから
  initializableJQueryPlugins(): void {
    $(`${componentSelector} #datepicker`).datepicker();
    $(`${componentSelector} #dialog`).dialog();
  }
  // 追加ここまで
}
```
`AppParent`クラスにjqueryプラグインに関するコードを色々追加しました。

* staticな`_initializedJQueryPluginSelectors`配列、及びそのgetter/setter。jqueryプラグインを登録したセレクターの配列を用意しておき、二重に登録されないようにします。
* abstractな`initializableJQueryPlugins()`。子クラスで実装することを強制します。

`AppPage1`クラスでは1つの関数を追加しました。

* `initializableJQueryPlugins()`。親クラスでabstractとなっているので実装する必要があります。jqueryプラグインの登録を行ないます。

---

3333333333333333333333333333333333333333333333333333333333333333333
```javascript
// app-parent.ts

export abstract class AppParent {
  private static _initializedJQueryPluginSelectors: string[] = [];
  private get initializedJQueryPluginSelectors() {
    return AppParent._initializedJQueryPluginSelectors;
  }
  private set initializedJQueryPluginSelector(selector: string) {
    AppParent._initializedJQueryPluginSelectors.push(selector);
  }
  
  protected abstract initializableJQueryPlugins(): void;
  
  // 追加ここから
  private _disposableSubscriptions: Subscription<any>[] = [];
  private get disposableSubscriptions() {
    return this._disposableSubscriptions;
  }
  protected set disposableSubscription(subscription: Subscription<any>) {
    this._disposableSubscriptions.push(subscription);
  }
  
  protected abstract initializableEventObservables(): void;
  // 追加ここまで
}
```
```javascript
// app-page1.ts

import {Component} from 'angular2/angular2'

const componentSelector = 'app-page1';

@Component({
  selector: componentSelector,
  template: `  
    <div id="datepicker"></div>
    <div id="dialog"></div>
    <div><input id="searchWord" type="text" [(ng-model)]="searchWord"></div>
    <div>{{now | date:'yyyy-MM-dd HH:mm:ss'}}</div>
  `
})
export class AppPage1 extends AppParent {  
  initializableJQueryPlugins(): void {
    $(`${componentSelector} #datepicker`).datepicker();
    $(`${componentSelector} #dialog`).dialog();
  }
  
  // 追加ここから
  static _searchWord: string = '';
  get searchWord() {
    return AppPage1._searchWord;
  }
  set searchWord(word: string) {
    AppPage1._searchWord = word;
  }
  now: number;
  
  initializableEventObservables(): void {
    this.disposableSubscription = Observable.fromEvent(document.getElementById('searchWord'), 'keyup')
      .map((event: KeyboardEvent) => event.target.value)
      .debounce<string>(() => Observable.timer(1000))
      .subscribe(value => {
        this.loadCards(value);
      });

    this.disposableSubscription = Observable.timer(1, 1000)
      .subscribe(() => {
        this.now = _.now();
      });
  }
  // 追加ここまで
}
```
`AppParent`クラスにObservableに関するコードを色々追加しました。

* `_disposableSubscriptions`配列、及びそのgetter/setter。Observableの配列を用意しておき、disposeするときに使います。
* abstractな`initializableEventObservables()`。子クラスで実装することを強制します。

`AppPage1`クラスでは1つの関数を追加しました。

* `initializableEventObservables()`。親クラスでabstractとなっているので実装する必要があります。Observableの生成を行ない、`disposableSubscription`に登録します。後でまとめてdisposeするときに使います。

4444444444444444444444444444444444444444444444444444444444444444444
```javascript
// app-parent.ts

import {OnDeactivate} from 'angular2/router'

export abstract class AppParent implements OnDeactivate {
  private static _initializedJQueryPluginSelectors: string[] = [];
  private get initializedJQueryPluginSelectors() {
    return AppParent._initializedJQueryPluginSelectors;
  }
  private set initializedJQueryPluginSelector(selector: string) {
    AppParent._initializedJQueryPluginSelectors.push(selector);
  }
  
  protected abstract initializableJQueryPlugins(): void;
  
  private _disposableSubscriptions: Subscription<any>[] = [];
  private get disposableSubscriptions() {
    return this._disposableSubscriptions;
  }
  protected set disposableSubscription(subscription: Subscription<any>) {
    this._disposableSubscriptions.push(subscription);
  }
  
  protected abstract initializableEventObservables(): void;
  
  // 追加ここから  
  private disposeSubscriptions(): void {
    this.disposableSubscriptions.forEach(subscription => {
      if (!subscription.isUnsubscribed) {
        subscription.unsubscribe();
      }
    });
  }
  
  routerOnDeactivate() {
    this.disposeSubscriptions();
  }
  // 追加ここまで
}
```
```javascript
// app-page1.ts

import {OnDeactivate} from 'angular2/router'
import {Component, Observable} from 'angular2/angular2' // 追加

const componentSelector = 'app-page1';

@Component({
  selector: componentSelector,
  template: `  
    <div id="datepicker"></div>
    <div id="dialog"></div>
    <div><input id="searchWord" type="text" [(ng-model)]="searchWord"></div>
    <div>{{now | date:'yyyy-MM-dd HH:mm:ss'}}</div>
  `
})
export class AppPage1 extends AppParent implements OnDeactivate {
  initializableJQueryPlugins(): void {
    $(`${componentSelector} #datepicker`).datepicker();
    $(`${componentSelector} #dialog`).dialog();
  }
  
  static _searchWord: string = '';
  get searchWord() {
    return AppPage1._searchWord;
  }
  set searchWord(word: string) {
    AppPage1._searchWord = word;
  }
  now: number;
  
  initializableEventObservables(): void {
    this.disposableSubscription = Observable.fromEvent(document.getElementById('searchWord'), 'keyup')
      .map((event: KeyboardEvent) => event.target.value)
      .debounce<string>(() => Observable.timer(1000))
      .subscribe(value => {
        this.loadCards(value);
      });

    this.disposableSubscription = Observable.timer(1, 1000)
      .subscribe(() => {
        this.now = _.now();
      });
  }
  
  // 追加ここから
  routerOnDeactivate() {
    super.routerOnDeactivate();
  } 
  // 追加ここまで
}
```
`AppParent`クラスにObservableに関するコードを色々追加しました。

* `disposeSubscriptions()`。登録された全てのObservableのSubscriptionをunsubscribeします。つまりdisposeします。
* `OnDeactivate`インターフェースの`routerOnDeactivate()`。ページ遷移で出る際にコールされます。

`AppPage1`クラスでは1つの関数を追加しました。

* `OnDeactivate`インターフェースの`routerOnDeactivate()`。そこで親クラスの`routerOnDeactivate()`、最終的には`disposeSubscriptions()`をコールします。

---

555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
```javascript
// app-parent.ts

import {OnDeactivate} from 'angular2/router'

export abstract class AppParent implements OnDeactivate {
  private static _initializedJQueryPluginSelectors: string[] = [];
  private get initializedJQueryPluginSelectors() {
    return AppParent._initializedJQueryPluginSelectors;
  }
  private set initializedJQueryPluginSelector(selector: string) {
    AppParent._initializedJQueryPluginSelectors.push(selector);
  }
  
  protected abstract initializableJQueryPlugins(): void;
  
  private _disposableSubscriptions: Subscription<any>[] = [];
  private get disposableSubscriptions() {
    return this._disposableSubscriptions;
  }
  protected set disposableSubscription(subscription: Subscription<any>) {
    this._disposableSubscriptions.push(subscription);
  }
  
  protected abstract initializableEventObservables(): void;
  
  private disposeSubscriptions(): void {
    this.disposableSubscriptions.forEach(subscription => {
      if (!subscription.isUnsubscribed) {
        subscription.unsubscribe();
      }
    });
  }
  
  routerOnDeactivate() {
    this.disposeSubscriptions();
  }
  
  // 追加ここから
  protected initPluginsAndObservables(selector: string): void {
    if (_.indexOf(this.initializedJQueryPluginSelectors, selector) === -1) {
      this.initializableJQueryPlugins();
      this.initializedJQueryPluginSelector = selector;
    }
    this.initializableEventObservables();
  }
  // 追加ここまで
}
```
```javascript
// app-page1.ts

import {OnDeactivate} from 'angular2/router'
import {Component, Observable, AfterViewInit} from 'angular2/angular2' // 追加

const componentSelector = 'app-page1';

@Component({
  selector: componentSelector,
  template: `  
    <div id="datepicker"></div>
    <div id="dialog"></div>
    <div><input id="searchWord" type="text" [(ng-model)]="searchWord"></div>
    <div>{{now | date:'yyyy-MM-dd HH:mm:ss'}}</div>
  `
})
export class AppPage1 extends AppParent implements OnDeactivate, AfterViewInit {
  initializableJQueryPlugins(): void {
    $(`${componentSelector} #datepicker`).datepicker();
    $(`${componentSelector} #dialog`).dialog();
  }
  
  static _searchWord: string = '';
  get searchWord() {
    return AppPage1._searchWord;
  }
  set searchWord(word: string) {
    AppPage1._searchWord = word;
  }
  now: number;
  
  initializableEventObservables(): void {
    this.disposableSubscription = Observable.fromEvent(document.getElementById('searchWord'), 'keyup')
      .map((event: KeyboardEvent) => event.target.value)
      .debounce<string>(() => Observable.timer(1000))
      .subscribe(value => {
        this.loadCards(value);
      });

    this.disposableSubscription = Observable.timer(1, 1000)
      .subscribe(() => {
        this.now = _.now();
      });
  }
    
  routerOnDeactivate() {
    super.routerOnDeactivate();
  }
  
  // 追加ここから
  ngAfterViewInit() {
    super.initPluginsAndObservables(componentSelector);
    this.loadCards(this.searchWord);
  }
  // 追加ここまで
}
```
`AppParent`クラスにコードを追加しました。

* `initPluginsAndObservables()`。子クラスで定義された`initializableJQueryPlugins()`と`initializableEventObservables()`をコールしてUIを用意します。ただし同じセレクターに対してjqueryプラグインを二重に登録しないように制御します。

`AppPage1`クラスでは1つの関数を追加しました。

* `AfterViewInit`インターフェースの`ngAfterViewInit()`。ビューが用意されたときにコールされます。そこで親クラスの`initPluginsAndObservables()`をコールします。

ここまでで結構な量のコードを親クラスに追いやることができたかと思います。こうして個々のビューに固有のコードだけを子クラスに残すことができます。  
ビューをいくつも作るに当たって共通となりそうなコードはバンバン追いやってしまいましょう。  
そしてAngular2のビューを作るときのポイントをもう一度整理します。

* jqueryプラグインは一度だけロードされるように制御すること。そうしないとページ遷移して戻ってきたときに動作がおかしくなる。
* Observableはページ遷移する度に全てdisposeして、戻ってくる度に登録し直すこと。そうしないと動作がおかしくなる。
* 共通のコードはなるべくまとめて親クラスに追いやること。
* 全てのビューで書きそうな関数は親クラスでabstractで宣言しておき、子クラスで定義を強制すること。 




---

## async/await loadCards() 追加
```javascript
// app-page1.ts

import {OnDeactivate} from 'angular2/router'
import {Component, Observable, AfterViewInit} from 'angular2/angular2' // 追加

const componentSelector = 'app-page1';

@Component({
  selector: componentSelector,
  template: `  
    <div id="datepicker"></div>
    <div id="dialog"></div>
    <div><input id="searchWord" type="text" [(ng-model)]="searchWord"></div>
    <div>{{now | date:'yyyy-MM-dd HH:mm:ss'}}</div>
    <div>
      <ul>
        <li *ng-for="#card of cards">{{card.title}} - {{card.body}}</li>
      </ul>
    </div>
  `
})
export class AppPage1 extends AppParent implements OnDeactivate, AfterViewInit {
  initializableJQueryPlugins(): void {
    $(`${componentSelector} #datepicker`).datepicker();
    $(`${componentSelector} #dialog`).dialog();
  }
  
  static _searchWord: string = '';
  get searchWord() {
    return AppPage1._searchWord;
  }
  set searchWord(word: string) {
    AppPage1._searchWord = word;
  }
  now: number;
  
  initializableEventObservables(): void {
    this.disposableSubscription = Observable.fromEvent(document.getElementById('searchWord'), 'keyup')
      .map((event: KeyboardEvent) => event.target.value)
      .debounce<string>(() => Observable.timer(1000))
      .subscribe(value => {
        this.loadCards(value);
      });

    this.disposableSubscription = Observable.timer(1, 1000)
      .subscribe(() => {
        this.now = _.now();
      });
  }
    
  routerOnDeactivate() {
    super.routerOnDeactivate();
  }
  
  ngAfterViewInit() {
    super.initPluginsAndObservables(componentSelector);
    this.loadCards(this.searchWord);
  }
  
  // 追加ここから
  cards: Card[] = [];
  
  loadCards(searchWord: string = ''): void {
    (async() => {
      let cards: Card[] = await this.http.get('/cards.json')
        .map((res: Response) => res.json() as Card[])
        .toPromise(Promise);
      if (searchWord) {
        const words: string[] = _.chain(searchWord.replace(/[　]/g, ' ').split(' '))
          .map(word => _.trim(word))
          .filter(word => word.length > 0)
          .value();
        words.forEach(word => {
          cards = _.filter(cards, card => {
            return _.some([card.title, card.body], value => value.indexOf(word) > -1);
          });
        });
      }
      this.cards = cards;
    })();
  }
  // 追加ここまで
}

declare interface Card { // 追加
  title: string;
  body: string;
}
```
`loadCards()`の定義を追加しました。  
これに関しては内容が大分かぶるので過去記事 [初心者がAngular2で嵌まったり解決したりサンプルコード書いたりしてみた。 - Httpモジュールを使ってみよう(async/await登場)](http://overmorrow.hatenablog.com/entry/2015/12/09/000000#part5)を参照してください。

---

今回の記事に関する実例をGitHubにアップロードしてあります。  
[ovrmrw/angular2sample1](https://github.com/ovrmrw/angular2sample1)  
おそらくCard Listのページしか間に合っていないと思いますが、一応は記事の内容が動作するサンプルとなっています。

以上です。ありがとうございました。