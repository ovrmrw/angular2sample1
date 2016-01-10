title: Angular2の実践的なビューの作り方(Abstract Classを使う)

## Angular2, TypeScript, Abstract Class, RxJS

**【更新】Angular2 beta.1に対応しました。**

[Angular 2 Advent Calendar 2015](http://qiita.com/advent-calendar/2015/angular2)の10日目です。

前提環境などは昨日と同じなので、先に軽く目を通しておいていただければと思います。当然TypeScriptが大前提です。   
昨日→[初心者がAngular2で嵌まったり解決したりサンプルコード書いたりしてみた。](http://overmorrow.hatenablog.com/entry/2015/12/09/000000)

今日は何のために、どういうメリットのためにクラスを継承(extends)するのかに焦点を当てます。  
想定する対象読者は↓

* 何のためにクラスの継承をするのかよくわからない。
* DogやCatがAnimalを継承したら何がウマいのかわからない。
* Abstract Classを継承することの意義がわからない。
* Abstract Classを知らない。

目次

* [Abstract Classとは／Abstract Classの意義](#part-begin)
* [Step1 abstract親クラスを子クラスで継承する。](#step1)
* [Step2 jqueryプラグインの登録に関するコードを書く](#step2)
* [Step3 イベントハンドラ(Subscription)の登録に関するコードを書く](#step3)
* [Step4 イベントハンドラ(Subscription)をdisposeするコードを書く](#step4)
* [Step5 jqueryプラグインとObservableイベントハンドラを登録するコードを書く(子クラスで実装した関数を親クラスから呼び出す)](#step5)
* [Step6 最後まで説明を保留していたloadCards()を書く](#step6)
* [GitHubにアップロードしてるので動かしてみてください](#github)

### <a name="part-begin">Abstract Classとは</a>
JavaやC#のようなオブジェクト指向の言語を使ってる人にとっては当たり前の機能ですが、TypeScriptには最近のバージョンでようやく追加されました。(interfaceは最初からあった)  
もちろんJavaScriptにはこのような概念はありません。  
Abstractの言葉の意味は「抽象的な、理論上の」といった感じですが、まあそれはいいとして要するに**interfaceを内包した継承専用のclass**だと思えばいいんじゃないでしょうか。
僕はそう理解していますよ。間違っていたらごめんなさい。  
最大の効能は、**親クラスを継承した子クラスに実装を強制できる**ということに尽きます。そう言うと「interfaceでもいいじゃん」となりがちですが、
interfaceはimplementsし忘れたら強制力を発揮できません。別に関数名が合ってればimplementsしてなくても動くし。  

クラスを継承しただけで強制力を持たせられるというのは、後程の説明でも出てきますが、強制しているが故に**親クラスから子クラスの関数を呼び出すこともできる**ということにつながります。  
子クラスで共通のコードを親クラスに追いやろうとするとき、これはとても大事なことなので覚えておいてください。

自分が書いたコードを数か月後にメンテナンスしている場面を想像できますか？
趣味ではありませんよ、ビジネスとしてです。
そのとき全てを忘れているあなたが子クラスに何か破壊的な変更をしようとする度に、コンパイラは何がどうあるべきかを思い出させてくれるでしょう。

コメントを適切に残すのも大事ですが、コードを適切に強制するのもメンテナンスする上では大事なことです。

### Abstract Classの意義
実装のないAbstract Functionを持つため、Abstract Classはそれ自身をインスタンス化することができません。つまり`new ParentClass()`はできません。  
継承専用となるため、子クラスで共通のコードをabstractな親クラスに追いやるようにしましょう。  

Web開発ではビューを作るときに、そうですね10画面ぐらいのビューを作るとしましょう。
全てのビューで共通のコードってあると思います。僕が思いつくところでは、

* jqueryプラグインの登録 (Step2)
* イベントハンドラの登録 (Step3)

今回はこの2つを取り上げますが、イベントハンドラはせっかくなのでAngular2の普通のやり方ではなく、
[RxJS](https://github.com/ReactiveX/RxJS)のSubscription(Observableイベントハンドラ)を使って例を示します。

後に出てくる以下の2つの関数に注意を払ってください。  
これらがAbstract Function(子クラスで実装を強制される関数)として登場します。

* `initializableJQueryPlugins()`
* `initializableEventObservables()`

親クラスでは宣言だけ、子クラスで実装します。その結果として親クラスの中で呼び出せるようになります。そして今回の例では

1. 子クラスのビューを用意しようとするとき、
1. 親クラスの`ngOnInit()`を通じて`initPluginsAndObservables()`実行。
1. (子クラスで実装されているはずの)`initializable`関数を親クラスから呼び出し。

という流れで処理されます。  
もう何度も言っていることですが、**Abstract Classを使うと共通するコードを親クラスに追いやってすっきりさせることが簡単にできます。**  
順を追って理解していけばそう難しいことはないはずですので、さあ、はじめましょう。

(僕は今回の記事のようなパターンを勝手に**Abstract Classデザインパターン**と読んでいます)


### <a name="step1">Step1 abstract親クラスを子クラスで継承する</a>
```javascript
// app-parent.ts

export abstract class AppParent {
}
```
```javascript
// app-page1.ts

import {Component} from 'angular2/core'

const componentSelector = 'app-page1';
@Component({
  selector: componentSelector,
  template: `  
  `
})
export class AppPage1 extends AppParent {
}
```
`AppPage1`子クラスは、abstractな`AppParent`親クラスを継承します。abstractな関数を宣言する予定なので、クラスもabstractを付けなければいけません。  
Step1は簡単ですね。

---


### <a name="step2">Step2 jqueryプラグインの登録に関するコードを書く</a>
```javascript
// app-parent.ts

export abstract class AppParent {
  
  // 追加ここから▼▼▼
  protected abstract initializableJQueryPlugins(): void;
  // 追加ここまで▲▲▲
}
```
```javascript
// app-page1.ts

import {Component} from 'angular2/core'

const componentSelector = 'app-page1';
@Component({
  selector: componentSelector,
  template: `  
    <div id="datepicker"></div>
    <div id="dialog"></div>
  `
})
export class AppPage1 extends AppParent {
  
  // 追加ここから▼▼▼
  initializableJQueryPlugins(): void {
    $(`${componentSelector} #datepicker`).datepicker();
    $(`${componentSelector} #dialog`).dialog();
  }
  // 追加ここまで▲▲▲
}
```
`AppParent`親クラス

* abstractな`initializableJQueryPlugins()`を追加。子クラスで実装することを強制します。

`AppPage1`子クラス

* `initializableJQueryPlugins()`を追加。親クラスでabstractとなっているので実装する必要があります。jqueryプラグインの登録を行ないます。

beta.0まではルーティングを使うときには**jqueryプラグインが確実に一度だけロードされるように制御する**必要がありましたが、  
beta.1からはAngular2側の制御が変わったみたいで逆に**ページ遷移で入る度に毎回ロードする**必要があります。  

この記事はその影響を多大に受けて多くのコードを削除することになりましたが、それはそれで書き方が楽になるので良いBreaking Changeだと思います。

---


### <a name="step3">Step3 イベントハンドラ(Subscription)の登録に関するコードを書く</a>
```javascript
// app-parent.ts

import {Subscription} from 'rxjs/Subscription'

export abstract class AppParent {
  
  protected abstract initializableJQueryPlugins(): void;
  
  // 追加ここから▼▼▼
  private _disposableSubscriptions: Subscription<any>[] = [];
  private get disposableSubscriptions() {
    return this._disposableSubscriptions;
  }
  protected set disposableSubscription(subscription: Subscription<any>) {
    this._disposableSubscriptions.push(subscription);
  }
  
  protected abstract initializableEventObservables(): void;
  // 追加ここまで▲▲▲
}
```
```javascript
// app-page1.ts

import {Component} from 'angular2/core'
import {Observable} from 'rxjs/Observable'
import _ from 'lodash'

const componentSelector = 'app-page1';
@Component({
  selector: componentSelector,
  template: `  
    <div id="datepicker"></div>
    <div id="dialog"></div>
    <div><input id="searchWord" type="text" [(ngModel)]="searchWord"></div>
    <div>{{now | date:'yyyy-MM-dd HH:mm:ss'}}</div>
  `
})
export class AppPage1 extends AppParent { 
  
  initializableJQueryPlugins(): void {
    $(`${componentSelector} #datepicker`).datepicker();
    $(`${componentSelector} #dialog`).dialog();
  }
  
  // 追加ここから▼▼▼
  static _searchWord: string = '';
  get searchWord() {
    return AppPage1._searchWord;
  }
  set searchWord(word: string) {
    AppPage1._searchWord = word;
  }
  now: number;
  
  initializableEventObservables(): void {
    this.disposableSubscription = Observable.fromEvent<KeyboardEvent>(document.getElementById('searchWord'), 'keyup') // (1)
      .map(event => event.target.value)
      .debounce(() => Observable.timer(1000))
      .subscribe(value => {
        this.loadCards(value); // 最後に説明します。
      }); // Subscription型が返る。

    this.disposableSubscription = Observable.timer(1, 1000) // (2)
      .subscribe(() => {
        this.now = _.now();
      }); // Subscription型が返る。
      
    this.disposableSubscription = Observable.fromEvent<MouseEvent>(document.getElementsByTagName(componentSelector), 'click') // (3)
      .map(event => event.target.textContent)
      .filter(text => _.trim(text).length > 0)
      .subscribe(text => {
        Materialize.toast(`You clicked "${text}"`, 2000); // Materialize-cssの通知 
      }); // Subscription型が返る。
  }
  // 追加ここまで▲▲▲
}
```
`AppParent`親クラス

* `_disposableSubscriptions`配列、及びそのgetter/setterを追加。Subscriptionを格納する配列を用意しておき、後でまとめてdisposeするときに使います。
* abstractな`initializableEventObservables()`を追加。子クラスで実装することを強制します。

`AppPage1`子クラス

* `initializableEventObservables()`を追加。親クラスでabstractとなっているので実装する必要があります。ObservableからSubscriptionの生成を行ない、`disposableSubscription`に代入します。後でまとめてdisposeするときに使います。

子クラスでstaticな変数を持つ理由は、**状態(値)を保存しておくため**です。  
今回の例では`searchWord`はルーティングでページを行ったり来たりしても失われずに残り続けます。

最初に述べたように、イベントハンドラは全て(といっても3つだけですが)ObservableからSubscriptionを生成しています。

1. input要素(`searchWord`)に文字を入力して、1秒間キーボード入力が止まると`loadCards()`がコールされる。
1. 1000ミリ秒毎に`now`を更新する。つまり時計の表示を更新する。
1. 色々なHTMLエレメントをクリックすると、イベントから取り出した`textContent`をMaterialize-cssのトーストで通知表示する。

これらのSubscriptionなイベントハンドラはページ遷移する度にdisposeと生成を繰り返さないと動作がおかしくなりますので、そのためのコードを次のStep4で示します。

お気づきかと思いますが、親クラスは子クラスに公開する必要のない変数や関数は`private`にします。
必要のないものは見せない。これも適切にプログラムを強制するということの一環かと思います。こういうのよく**カプセル化**とかいいますね。



### <a name="step4">Step4 イベントハンドラ(Subscription)をdisposeするコードを書く</a>
```javascript
// app-parent.ts

import {Subscription} from 'rxjs/Subscription'
import {OnDestroy} from 'angular2/core'

export abstract class AppParent implements OnDestroy { // interfaceをimplementsする
  
  protected abstract initializableJQueryPlugins(): void;
  
  private _disposableSubscriptions: Subscription<any>[] = [];
  private get disposableSubscriptions() {
    return this._disposableSubscriptions;
  }
  protected set disposableSubscription(subscription: Subscription<any>) {
    this._disposableSubscriptions.push(subscription);
  }
  
  protected abstract initializableEventObservables(): void;
  
  // 追加ここから▼▼▼
  private disposeSubscriptions(): void {
    this.disposableSubscriptions.forEach(subscription => {
      if (!subscription.isUnsubscribed) {
        subscription.unsubscribe();
      }
    });
    this._disposableSubscriptions = void 0;
  }
  
  ngOnDestroy() {
    this.disposeSubscriptions();
  }
  // 追加ここまで▲▲▲
}
```
`AppParent`親クラス

* `disposeSubscriptions()`を追加。配列に格納された全てのSubscriptionをunsubscribeします。つまりdisposeします。ページ遷移で出る際に必須です。
* `OnDestroy`インターフェースの`ngOnDestroy()`を追加。ページ遷移で出る度にイベント発火します。

`AppPage1`子クラス

* 追加変更ありません。もし子クラスでも`ngOnDestroy()`を実装する場合は、その中で`super.ngOnDestroy()`を書く必要があります。(そうしないと親クラスの`ngOnDestroy()`が呼ばれないため)

さあ、子クラスには何も追加していません。  
ページ遷移で出る際、`OnDestroy`インターフェースの`ngOnDestroy()`が呼ばれますが、子クラスには定義していないので自動的に親クラスの`ngOnDestroy()`が呼ばれ、`disposeSubscriptions()`が実行されます。  

親クラスで何をやっているかなんて全く気にしなくていいですね。なんてすっきりなんでしょう。  
しかしAbstract Classは次のStep5で**本領を発揮します。**

---


### <a name="step5">Step5 jqueryプラグインとObservableイベントハンドラを登録するコードを書く(子クラスで実装した関数を親クラスから呼び出す)</a>
```javascript
// app-parent.ts

import {Subscription} from 'rxjs/Subscription'
import {OnDestroy, OnInit} from 'angular2/core'

export abstract class AppParent implements OnDestroy, OnInit {
  
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
    this._disposableSubscriptions = void 0;
  }
  
  ngOnDestroy() {
    this.disposeSubscriptions();
  }
  
  // 追加ここから▼▼▼
  private initPluginsAndObservables(): void {
    this.initializableJQueryPlugins();
    this.initializableEventObservables();
  }
  
  ngOnInit() {
    this.initPluginsAndObservables();
  }
  // 追加ここまで▲▲▲
}
```
`AppParent`親クラス

* `initPluginsAndObservables()`を追加。**子クラスで実装された**`initializableJQueryPlugins()`と`initializableEventObservables()`を**親クラスから実行して**UIを準備します。ただし同じセレクターに対してjqueryプラグインを二重に登録しないように制御します。
* `OnInit`インターフェースの`ngOnInit()`を追加。ページ遷移で入る度にイベント発火します。

`AppPage1`子クラス

* 追加変更ありません。もし子クラスでも`ngOnInit()`を実装する場合は、その中で`super.ngOnInit()`を書く必要があります。(そうしないと親クラスの`ngOnInit()`が呼ばれないため)

さあ、わかっていただけたでしょうか。  
子クラスで実装された2つの`initializable`関数は、子クラスの中では実行されません。  
(子クラスで`ngOnInit()`を書くときだけ注意する必要があります)      
そして子クラスは**親クラスが何をしているかを知る必要はありません。**ただ単に**実装を強制された関数を適切に実装しているだけ**です。  
これがAbstract Classの威力です。使えば使うほどその力はあなたの役に立つはずです。

例えこの親クラスを継承するビューが10個あろうが100個あろうが、仕様変更時に子クラスが受ける影響は軽微であることが伝わるかと思います。  
共通となりそうなコードはバンバン追いやってしまいましょう。Angular2のビューを作るときのポイントをもう一度整理しますよ。

* Observableイベントハンドラはページ遷移で出る度に全てdisposeして、入る度に全て登録し直すこと。そうしないと動作がおかしくなる。
* 共通のコードはなるべくまとめて親クラスに追いやること。親クラスから子クラスで実装したコードを呼び出せる性質を利用すること。
* 仕様変更時にいかに自分が楽できるかを考えながらコーディングすること。ビジネスの現場では仕様変更はしょっちゅうある。

**これができるのはTypeScriptによる恩恵が大きいです。静的な型の力ですね。**  

さて、親クラスはこれで完成ですが、最後に説明を保留していた`loadCards()`を子クラス追加して終わりたいと思います。。

---

## <a name="step6">Step6 最後まで説明を保留していたloadCards()を書く</a>
これはもうオマケみたいなものなので、読み飛ばしてGitHubにアップロードしたサンプルコードを動かしてもらったが早いと思います。
```javascript
// app-page1.ts

import {Component} from 'angular2/core'
import {Observable} from 'rxjs/Observable'
import _ from 'lodash'
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http'

const componentSelector = 'app-page1';
@Component({
  selector: componentSelector,
  template: `  
    <div id="datepicker"></div>
    <div id="dialog"></div>
    <div><input id="searchWord" type="text" [(ngModel)]="searchWord"></div>
    <div>{{now | date:'yyyy-MM-dd HH:mm:ss'}}</div>
    <div>
      <ul>
        <li *ngFor="#card of cards">{{card.title}} - {{card.body}}</li>
      </ul>
    </div>
  `,
  providers: [HTTP_PROVIDERS]
})
export class AppPage1 extends AppParent {
   
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
    this.disposableSubscription = Observable.fromEvent<KeyboardEvent>(document.getElementById('searchWord'), 'keyup')
      .map(event => event.target.value)
      .debounce(() => Observable.timer(1000))
      .subscribe(value => {
        this.loadCards(value);
      });

    this.disposableSubscription = Observable.timer(1, 1000)
      .subscribe(() => {
        this.now = _.now();
      });
      
    this.disposableSubscription = Observable.fromEvent<MouseEvent>(document, 'click')
      .map(event => event.target.textContent)
      .filter(text => _.trim(text).length > 0)
      .subscribe(text => {
        Materialize.toast(`You clicked "${text}"`, 2000);  
      });    
  }
  
  // 追加ここから▼▼▼
  constructor(public http: Http) {
  }
  cards: Card[] = [];
  
  loadCards(searchWord: string = ''): void {
    (async() => {
      let cards: Card[] = await this.http.get('/cards.json')
        .map((res: Response) => res.json() as Card[])
        .toPromise(Promise); // (1)
      if (searchWord) {
        const words: string[] = _.chain(searchWord.replace(/[　]/g, ' ').split(' ')) // (2)
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
  // 追加ここまで▲▲▲
}

declare interface Card { // 追加
  title: string;
  body: string;
}
```
`loadCards()`の定義を追加しました。    
これに関しては内容が大分かぶるので過去記事 [初心者がAngular2で嵌まったり解決したりサンプルコード書いたりしてみた。 - Httpモジュールを使ってみよう(async/await登場)](http://overmorrow.hatenablog.com/entry/2015/12/09/000000#part5)を参照してください。  
補足程度に簡単に説明すると、

* `async`関数スコープ内は非同期処理を同期風に書ける。
* `await`は`Promise`が解決するまで先に進まない。
* (1)でObservable型をPromise型に変換している。`await`で待ち受けするため。
* (2)で`searchWord`をスペースで区切って配列に変換している。
* 入力したワードがCardのtitleかbodyに一致したものだけ絞り込んで画面に表示する。

こんなようなことをやっています。  
Httpモジュールを使うので、

* `import {Http, HTTP_PROVIDERS} from 'angular2/http'`
* `@Component({ providers: [HTTP_PROVIDERS] })`
* `constructor(public http: Http) { }`

上記3点はセットで揃えましょう。

これで子クラスも完成しました。お疲れ様でした。  
お気づきかと思いますが**Abstract Classデザインパターン**がAngular2に依存するコードはイベント発火時の関数名(`ngOnInit()`,`ngOnDestroy()`)だけなので、
どのフレームワークを使ったとしても他の部分のコードは流用できるかと思います。

---

### <a name="github">GitHubにアップロードしてるので動かしてみてください</a>

今回の記事に関する実例をGitHubにアップロードしました。  
[ovrmrw/angular2sample1](https://github.com/ovrmrw/angular2sample1)  
Card Listのページともう一つのページしかありませんが、一応は記事の内容が動作するサンプルとなっています。時間のあるときにでも見てみてください。

サンプルコードを順を追って説明するためにかなりの長文になってしまったことをお詫びします。

明日は [@jimbo](http://qiita.com/jimbo) さんです。

ありがとうございました。