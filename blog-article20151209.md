title: 初心者がAngular2で嵌まったり解決したりサンプルコード書いたりしてみた。

## Angular2, TypeScript, VS Code, System.js, async/await, Electron

**【更新】Angular2 beta.0に対応しました。**

[Angular 2 Advent Calendar 2015](http://qiita.com/advent-calendar/2015/angular2)の9日目です。 

目次

* [はじめに](#part-begin)
* [Part1 tsdでインストールされるd.tsファイルがES6対応じゃないなら自力で対応しよう](#part1)
* [Part2 System.jsを使うならconfigは専用ファイルを用意しよう](#part2)
* [Part3 TypeScript→ES6→Babelで事前コンパイルしよう(async/await対応)](#part3)
* [Part4 ルーティングを書いてみよう](#part4)
* [Part5 Httpモジュールを使ってみよう(async/await登場)](#part5)
* [Part6 ElectronとSystem.jsで初心者が嵌まりそうなこと(require('remote')編)](#part6)
* [Part7 Electronで初心者が嵌りそうなこと(jqueryプラグイン編)](#part7)
* [Part8 interfaceを実装してBreaking Changesに備えよう](#part8)
* [最後に](#part-end)

### <a name="part-begin">はじめに</a>
みなさんAngular2使ってますか？ 使ってませんよね、だってまだalphaバージョンだもん。(先日も破壊的な更新があったし…)  
でも僕は最近妙にハマってます。公式チュートリアルがすごくわかりやすくて直観的だったから。まあalpha故に別の意味でも度々ハマってますがw  

ちなみに僕は**Web開発の経験はほとんどない**し**Angular1もよくわかってない**、なんでここに参加してるのかもよくわからない出自の者なのですが、
普段は基幹業務系のSIerです。どちらかというとフロントエンドよりもサーバーサイド寄りです。Angular2以外に触れたことのあるフレームワークと言えば[Knockout](http://knockoutjs.com/)と[Aurelia](http://aurelia.io/)くらいです。  
なんでWeb開発に手を出してるの？と聞かれたら今のところは「修行の一環として」としか答えられないです。はいすみません。

さて来年には正式リリースされる予定のAngular2ですが、一番の注目点は**TypeScriptベース**で開発されているということです。  
ちょっと前にKnockoutでWeb開発に触れたとき、最初に痛感したのは「型の無いJavaScriptキモイ」ということでした。
仕事でC#をちょこちょこ使うMicrosoft派な僕にとって型が無いから実行時まで構文上のエラーさえ知らされないというのは「そんなん無理じゃん」というぐらい生理的に受け付けないものでした。(Lintとか知らない)  
そしたらしばらくしてTypeScriptというものが世に出てきまして、そのとき1万だか2万行ぐらい書いてたJavaScriptのコードを夢中でTypeScriptに書き直したことを覚えています。
まあそのときの成果物は今となっては稼働していないので懐かしい思い出話なんですけどね。  

前置きが長くなりましたが、そういうわけで僕はIntelliSenseに飼い慣らされたこともあって**型の無い世界は嫌い**です。だからNot JavaScript But TypeScriptです。  
そしてせっかくなら新しいもの使いたいじゃないですか。ES6。それにC#出身なんでasync/awaitも使いたいですよね。  

ではいきましょう。今回の記事の前提環境です。

* OSはWindows (自宅にも職場にもあるから)
* Visual Studio Code (TypeScriptと相性が良さそうだから)
* モジュールローダーはSystem.js (Angular2の公式チュートリアルがそうだから)
* JavaScriptは余程のことがない限り全てTypeScriptで書く (型が無いと生きられないから)
* TypeScriptのtargetはES6 (新しいしasync/await使えるから)
* TypeScript→ES6→Babelで事前コンパイルする (async/awaitを動かすため)
* [5 MIN QUICKSTART](https://angular.io/docs/ts/latest/quickstart.html)とか[TUTORIAL: TOUR OF HEROES](https://angular.io/docs/ts/latest/tutorial/)とか一通りわかる (基礎知識として必要だから)

WindowsでのNode.js環境の作り方は過去記事 [Windowsでnpm installの赤いエラーに悩まされているアナタへ](http://overmorrow.hatenablog.com/entry/2015/11/27/235935)で詳しく触れています。

そして下記のnpm installがされていることを想定します。
```
npm install es6-promise@^3.0.2 es6-shim@^0.33.3 -save
npm install reflect-metadata@0.1.2 rxjs@5.0.0-beta.0 zone.js@0.5.10 --save --save-exact
npm install angular2@2.0.0-beta.1 --save --save-exact 
npm install systemjs lodash jquery hammerjs materialize-css --save
npm install typescript babel-preset-es2015 babel-polyfill gulp gulp-typescript gulp-babel gulp-ignore electron-prebuilt --save-dev
tsd install lodash jquery --save
```

僕が普段使っている`tsconfig.json`ファイルの内容です。今回はこの設定を前提とします。
```json
// tsconfig.json (TypeScript1.7用)

{
  "compilerOptions": {
    "target": "ES6",
    "noImplicitAny": false,
    "sourceMap": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "node"
  },
  "exclude": [
    "node_modules"
  ]
}
```

---

## <a name="part1">Part1 tsdでインストールされるd.tsファイルがES6対応じゃないなら自力で対応しよう</a>
よくみんなtsdでd.tsファイルをインストールしますよね、こうやって。
```
tsd install lodash --save
```
でもこれ、将来的にはどうか知りませんが現状はES6対応していません。  
例えば`app.ts`というファイルの中で…
```javascript
// app.ts

import _ from 'lodash'
```
って書くと`'lodash'`のとこに**赤い波線**が出てきます。なにやらエラーのようです。  
そこで`typings/lodash/lodash.d.ts`ファイルを見てみると、最後の方に…
```javascript
// lodash.d.ts

declare module "lodash" {
    export = _;
}
```
と書いてあります。これが原因ですね。`import _ from 'lodash'`と書きたい場合、これを…
```javascript
// export = _;
export default _;
```
としなくてはいけません。TypeScriptの仕様なのかES6の仕様なのか知りませんが、そういうものだからです。  
でもなるべく`typings`フォルダの中はいじりたくないですよね。だから`my.d.ts`ファイルみたいに別ファイルを用意して…
```javascript
// my.d.ts

declare module "lodash" {
  export default _;
}
```
と書きます。そうするとオーバーライド(?)みたいな扱いになるのか、`import _ from 'lodash'`はエラーと見なされなくなります。
ちなみに`import * as _ from 'lodash'`と書けばそもそもエラーにはなりません。ネットで調べるとよくこの書き方を指南されるんじゃないでしょうか。    
じゃあなんで

* `import * as _ from 'lodash'`ではダメで
* `import _ from 'lodash'`にこだわるのか

というと、前者は`window`オブジェクトに枝を生やさない(`window._`が生成されない)のに対し、後者は枝を生やすからです。  
つまりHTMLファイルで`<script src="...lodash.js">`みたいなことを書かなくていいんですね。これは特に下記のようなコードに影響します。
```javascript
// app.ts

onClick(event) {
  if (_.isEmpty(event.target.value)) .....  
}
```
うろ覚えで適当にコード書いてますが、要するにボタンクリック時とかに発火するような関数の中でlodashを使おうとしていると、`window._`が存在しない場合にエラーになります。
先ほどの前者はダメで後者なら良いというのはこういうことです。後者はRequireJSと同じようなものだというとわかりやすいかもしれません。

TypeScriptと付き合っていくときの心得としては、

* 動くなら多少のエラーは無視する。
* 与えられたコードは必要に応じてオーバーライド(?)したり直接上書きしたりする。

というのも必要かなって思います。あと公式ドキュメントはちゃんと読みましょう。  
僕はTypeScriptのエラーと格闘して何時間か嵌りました。


## <a name="part2">Part2 System.jsを使うならconfigは専用ファイルを用意しよう</a>
Angular2の公式チュートリアルで採用されているものが正義です。少なくとも僕の中では。というか他のツールでAngular2を使う方法を知りません。  
それ以前に[Aurelia](http://aurelia.io/)もjspm(System.jsを内包しているライブラリ)を推していますから、僕はその流れに乗るしかありません。

ところでチュートリアルだとHTMLファイルの中にさらっと`System.config()`が書いてありますが、結構がっつりやるとこれがどんどんボリューム増になります。  
jspmとか使うとこの辺はわりと自動でやってくれるんですけど、せっかくだから**node_modulesフォルダの中身をブラウザ環境で使いまわしたい**し勉強も兼ねて自分で書いた方がいいですね。

これは僕が普段使っているもので、`index.html`ファイルと同じ場所に配置します。
```javascript
// system.config.js

System.config({
  baseURL: '.',
  transpiler: false,
  paths: {
    'node:*': '../node_modules/*',    
  },
  map: {
    'babel-polyfill': 'node:babel-polyfill/dist/polyfill.min.js',
    'numeral': 'node:numeral/min/numeral.min.js',
    'moment': 'node:moment/min/moment.min.js',
    'lodash': 'node:lodash/index.js',
  },
  packages: {
    'app': { defaultExtension: 'js' },
  },
  meta: {
    'app/*.js': { deps: ['babel-polyfill'] }
  }
});
```
System.jsは**ブラウザ上でのimportやrequireをフックする(本来の機能を上書きする)もの**なので、
`System.config()`がちゃんと設定されていないと`ts`ファイルで`import _ from 'lodash'`とか書いても無駄ですので注意しましょう。  
`meta`プロパティでやっていることは、`/src/app/*.js`ファイルが読み込まれたら一緒にbabel-polyfillを読み込む、という指示です。
現状はこれがないとasync/awaitが動きませんので注意してください。
僕は当初System.jsがrequireやimportにどう影響を及ぼしているか理解していなかったので何時間か嵌りました。

(関連過去記事 [TypeScript + System.jsの構成におけるSystem.config()の基本パターン。](http://overmorrow.hatenablog.com/entry/2015/11/15/213830))


## <a name="part3">Part3 TypeScript→ES6→Babelで事前コンパイルしよう(async/await対応)</a>
正直言ってgulpfileの書き方よくわかってません。が、こんな感じで書くと`gulp tsc`とか`gulp watch`したときにちゃんとコンパイルしてくれます。
```javascript
// gulpfile.js

'use strict';
const gulp = require('gulp');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const ignore = require('gulp-ignore');

gulp.task('tsc', () => {
  const tsProject = ts.createProject('tsconfig.json', { noExternalResolve: true });
  tsProject.src()
    .pipe(ignore.exclude(['**/*.d.ts', 'node_modules/**/*.*', 'typings/**/*.*']))
    .pipe(ignore.include(['*.ts', 'src/**/*.ts']))
    .pipe(ts(tsProject)) // (1)
    .pipe(babel({ // (2)
      presets: ['es2015']
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', () => {
  gulp.watch(['*.ts', 'src/**/*.ts'], ['tsc']);
});
```
`tsconfig.json`ファイルの中で`target: ES6`と指定しているので、(1)の段階でTypeScriptから**ES6のJavaScript**に変換されます。
でもこれだけだと現状のブラウザでは動かないんですね。もう一度変換する必要があります。  
次の(2)の段階でBabelに通してようやくブラウザで動く**ES5のJavaScript**に変換されます。  
これでC#erが泣いて喜ぶ**async/awaitが動くES5のJavaScriptファイル**の完成ですよ。(細かいことを言えばさらにbabel-polyfillが必要です)

処理速度を気にしなければブラウザ上で実行時にBabelで変換するというやり方もあったのですが、
最新版のBabelでは非推奨になっているのと公式サイトからもやり方が消えてしまったので**今後はブラウザ環境で実行時コンパイルをやるな**、ということなのだと思います。    
僕はgulpfileの書き方で何時間か嵌りました。


## <a name="part4">Part4 ルーティングを書いてみよう</a>
公式チュートリアルにはルーティングの書き方の説明がないんですよね。    
最もシンプルに説明するにはどうしたらいいかなって思って、下記のコードに辿り着きました。後はこれにゴテゴテ色々付け足していくことになると思います。
```javascript
import {Component, provide} from 'angular2/core'
import {bootstrap} from 'angular2/platform/browser'
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Location, LocationStrategy, HashLocationStrategy} from 'angular2/router'
import {Page1} from './page1/page1'
import {Page2} from './page2/page2'

@Component({
  selector: 'my-app',
  template: `
    <ul>
      <li><a [routerLink]="['/Page1']">PAGE1</a></li>
      <li><a [routerLink]="['/Page2']">PAGE2</a></li>
    </ul>
    <router-outlet></router-outlet>
  `,
  directives: [Page1, Page2, ROUTER_DIRECTIVES]
})
@RouteConfig([
  new Route({ path: '/p1', component: Page1, name: 'Page1', useAsDefault: true }),
  new Route({ path: '/p2', component: Page2, name: 'Page2' }),
])
export class App {
  constructor(public location: Location, public router: Router) {
  }
}
bootstrap(App, [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);
```
`new Route()`の中で`component`と`name`で同じこと書くならどっちかいらなくね？って思ったんですが、両方書いてないとエラーになるみたいです。  
(↑この辺は理解が曖昧なので下のリンク先を参照してください)  
`constructor()`でDIしているのはAngular2のお約束みたいなものですね。

ちなみにルーティングを使うときはHTMLファイルで…
```html
<script src="../node_modules/angular2/bundles/router.dev.js"></script>
```
をお忘れなく。僕はこれで何時間か嵌りました。

ルーティングに関しては[Angular2のRouterを触ってみる](http://qiita.com/_likr/items/baf59e41f3c6ed5609be)が詳しいです。

## <a name="part5">Part5 Httpモジュールを使ってみよう(async/await登場)</a>
公式チュートリアルにはHttpモジュールの使い方も説明されていません。  
最もシンプルに説明するにはどうしたらいいかな、でもasync/awaitも書きたいしって思ってたらこうなりました。
```javascript
import {Component} from 'angular2/core'
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http'
import _ from 'lodash'

@Component({
  selector: 'my-page1',
  template: `
    <input type="text" (keyup)="onChangeWord($event)">
    <ul>
      <li *ngFor="#card of cards">{{card.title}} - {{card.body}}</li>
    </ul>
  `,
  providers: [HTTP_PROVIDERS]
})
export class Page1 {
  cards: Card[] = [];
  
  // .....色々省略
  
  constructor(public http: Http) {
  }
  onChangeWord(event: KeyboardEvent): void {
    const value = event.target.value;
    this.loadCards(value);
  }
  loadCards(searchWord: string = ''): void {
    console.log(1);
    (async() => {
      console.log(2);
      let cards = await this.http.get('/cards.json')
        .map((res: Response) => res.json() as Card[])
        .toPromise(Promise);
      console.log(4);
      if (searchWord) {
        const words = _.words(searchWord);
        words.forEach(word => {
          cards = _.filter(cards, card => {
            return card.title.indexOf(word) > -1 || card.body.indexOf(word) > -1;
          });
        });
      }
      this.cards = cards;
    })();
    console.log(3);
  }  
}
```
すみません、**シンプルではなくなってしまいました。**  
元々のコードを大分端折ったので伝わるかどうかわからないのですが、検索ワードを入力するinput要素があって、
何か入力すると`loadCards()`が呼ばれてCardの中の文字列にヒットするものだけを絞り込んで画面に表示する、という内容です。  
さてこの`loadCards()`の特徴は…

* `async`関数スコープ内は非同期処理を同期っぽく書ける。
* consoleには1, 2, 3, 4の順でログが残る。
* `await`は`Promise`が解決するのを待ってから先に進む。
* Angular2のHttpモジュールはObservable型を返すが、そのままだとawaitできないので`toPromise()`でPromise型に変換している。
* `if`より先は`cards`が値を持っていることを前提として書けるので`then()`の出番はない。
* async/awaitは要するに`function*`と`yield`の組み合わせと同じ。(だと思う)

Angular2のHttpモジュールはネットで調べるとわかるように、敢えてPromiseではなくrxjsのObservableを採用しています。  
そしてその場合、通例では`map()`の次に`subscribe()`で受けてそこでその後の処理を書くわけなんですが、それだと`then()`と大して変わらないし、
せっかくasync/awaitやってるんだからawaitできるように`toPromise()`でPromise型に変換して返したいよねって思ってたらこういう結果になりました。

ちなみにHttpモジュールを使うときはHTMLファイルで…
```html
<script src="../node_modules/angular2/bundles/http.dev.js"></script>
```
をお忘れなく。僕はこれで何時間か嵌りました。

Httpモジュールに関しては[Angular2のHttpモジュールを眺めてベストプラクティスを考える](http://qiita.com/laco0416/items/364c5923f77458c468ac)が詳しいです。


## <a name="part6">Part6 ElectronとSystem.jsで初心者が嵌まりそうなこと(require('remote')編)</a>
[Electron](http://electron.atom.io/)のレンダラプロセス(ブラウザ)からメインプロセス(サーバーサイド)のモジュールを使いたいとき、普通にやったら[レンダラプロセスではrequireできない](http://electron.atom.io/docs/latest/tutorial/quick-start/)んですね。    
そういうときどうしたら良いか[公式ドキュメント:remote](http://electron.atom.io/docs/v0.35.0/api/remote/)には以下のように説明されています。
```javascript
const remote = require('remote');
const BrowserWindow = remote.BrowserWindow;

var win = new BrowserWindow({ width: 800, height: 600 });
win.loadURL('https://github.com');
```
レンダラプロセス内で`require('remote')`して、remote経由でメインプロセスのモジュールを操作しろ、と。  

さてここで一つ問題が生じます。**System.jsがrequireをフックしている**という点です。  
System.jsをモジュールローダーとして使う場合、上記のコードは動作しません。代わりにこういう風に書く必要があります。
```javascript
const remote = System._nodeRequire('remote');
```
詳しくは[SystemJS API](https://github.com/systemjs/systemjs/blob/master/docs/system-api.md)を参照してください。  
あとはElectron公式ドキュメントの通りで大丈夫です。  
僕はこれで何時間も嵌りました。


## <a name="part7">Part7 Electronで初心者が嵌りそうなこと(jqueryプラグイン編)</a>
僕がよく使うライブラリの中で、lodash, moment, numeralあたりはPart1の方法でHTMLから`<script src=...`を追放できます。  
が、jqueryとそのプラグインだけは例外であり、**Expressのようなブラウザ環境とElectron環境で両立する書き方**は工夫が必要です。

ネットで色々調べた結果、最もシンプルな解決策はこれだろうという結論に達したのがこれです。HTMLファイルの中に書きます。
```html
<script src="../node_modules/jquery/dist/jquery.min.js" onload="try{ window.jQuery = window.$ = module.exports; }catch(e){ }"></script>
<script src="../node_modules/hammerjs/hammer.min.js" onload="try{ window.Hammer = module.exports; }catch(e){ }"></script>
<script src="../node_modules/materialize-css/dist/js/materialize.min.js"></script>
```
上記は個人的に気に入っている[Materialize-css](http://materializecss.com/)というCSSフレームワークを使う例です。  
おそらくブラウザ環境だけならhammerjsの指定は必要ないと思いますが、Electron環境ではこう書かないと動きません。
最もよく使われている[Bootstrap](http://getbootstrap.com/)でも同じような書き方で通用するだろうと思いますので試してみて下さい。

~~それとSPA開発なら当然**jqueryプラグインを一度だけロードする方法**も知っておく必要があります。これも嵌まりポイントです。~~  
**【注意】beta.1からはAngular2側の制御が変わり、jqueryプラグインは毎回ロードする必要があります。下記のサンプルコードはbeta.0以前の場合に有効です。**
```javascript
import {Component, AfterViewInit} from 'angular2/core'
declare var $: JQueryStatic;

const componentSelector = 'my-page2';

@Component({
  selector: componentSelector,
  template: `
    <!-- 省略 -->
  `
})
export class Page2 implements AfterViewInit {
  static _isJQueryPluginsInitialized: boolean = false;
  get isJQueryPluginsInitialized() {
    return Page2._isJQueryPluginsInitialized;
  }
  set isJQueryPluginsInitialized(flag: boolean) {
    Page2._isJQueryPluginsInitialized = flag;
  }

  ngAfterViewInit() {
    if(!this.isJQueryPluginsInitialized) {
      this.initJQueryPlugins();
      this.isJQueryPluginsInitialized = true;
    }
  }
  initJQueryPlugins(): void {
    $(`${componentSelector} .modal-trigger`).leanModal();
  }
}
```
~~上記は[Materialize-cssのModals](http://materializecss.com/modals.html)を使えるようにするコード例です。  
`ngAfterViewInit()`は僕の知る限りコンポーネント生成の一番最後に実行される関数なのでここに書きます。
classのstatic変数で既にロードされたかどうかのフラグを持つのがコツですね。~~  

これに関しては[Angular2の実践的なビューの作り方(Abstract Classを使う)](http://overmorrow.hatenablog.com/entry/2015/12/10/000000)でより詳細に触れています。


## <a name="part8">Part8 interfaceを実装してBreaking Changesに備えよう</a>
alpha.46からalpha.47に変わったとき`onInit()`メソッドは`ngOnInit()`に変わりました。
名前が他で使われそうというのが理由らしいのですが、これは事の経緯を知らないといきなり動かなくなって嵌まる要因になります。僕は嵌まりました。  

そこでオススメしたいのは**多少面倒でもinterfaceを実装しておく**ことです。
```javascript
import {Component, OnInit, AfterContentInit, AfterViewInit} from 'angular2/angular2'

const componentSelector = 'my-page2';

@Component({
  selector: componentSelector,
  template: `
    <!-- 省略 -->
  `
})
export class Page2 implements OnInit, AfterContentInit, AfterViewInit {
  constructor() {
    console.log(`${componentSelector} constructor`);
  }
  ngOnInit(){
    console.log(`${componentSelector} onInit`);    
  }
  ngAfterContentInit() {
    console.log(`${componentSelector} afterContentInit`);    
  }
  ngAfterViewInit() {
    console.log(`${componentSelector} afterViewInit`);    
  }
}
```
一行目でinterfaceをimportして、classのimplementsに加えていますね。  
これにより、

* interface名が変更される。
* interfaceの仕様が変更される。

どちらの仕様変更があった場合でもTypeScriptがエラーを通知してくれるようになります。型を持つ者の強みですね。

ちなみに上記のコードを実行するとわかるのですが、`constructor()` `ngOnInit()` `ngAfterContentInit()` `ngAfterViewInit()`の順で実行されます。

---

## <a name="part-end">最後に</a>
嵌ってばかりでしつこいと思われるかもしれませんが僕にしてみれば**Web開発は嵌ってることの方が多い**です。  
何か一行書くためだけに何時間かネットで調べて、やってみてダメだからまた調べに行って、トライ＆エラーの繰り返し。よくみんなこんなことやってられますねw  
そもそもWeb開発の最前線にいるわけでもない僕が書いたものなので、ところどころ筋違いなことを書いていたり理解できない部分があったかもしれません。
各章に参考文献へのリンクも記載しようかなとも思ったのですが、思い出せないものもたくさんあるしほとんど英語なので思い切ってばっさりなくしてしまいました。  

KnockoutのチュートリアルでJavaScriptを覚えて、AureliaのチュートリアルでモダンWeb開発に触れて、TypeScriptでようやくWebにも秩序が生まれるかなと思ったところに
TypeScriptネイティブのAngular2の登場ですよ。Angular1を知らない僕でもこれならなんとかなるかなと思って手を出して以来、少し僕の中にも知見が積み上がってきた気がしたので
こうして思い切ってAdvent Calendarに投稿してみた次第です。  
どれか一つでもこれからAngular2を触る人の助けになれば幸いです。

ここまで読んでいただいてありがとうございました。

明日は…… また僕ですw 別の方の予定だったのですが急遽変更になりました。ではまた明日。