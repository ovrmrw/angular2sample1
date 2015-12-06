## Angular2, TypeScript, VS Code, System.js, async/await, Electron

[Angular 2 Advent Calendar 2015](http://qiita.com/advent-calendar/2015/angular2)の9日目です。 

目次

* はじめに
* Part1 tsdでインストールされるd.tsファイルがES6対応じゃないなら自力で対応しよう
* Part2 System.jsを使うならconfigは専用ファイルを用意しよう
* Part3 TypeScript→ES6→Babelで事前コンパイルしよう
* Part4 ルーティングを書いてみよう
* Part5 Httpモジュールを使ってみよう(async/await登場)
* Part6 ElectronとSystem.jsできっと誰もが嵌ること
* まとめ

### はじめに
みなさんAngular2使ってますか？ 使ってませんよね、だってまだalphaバージョンだから。  
でも僕は最近妙にハマってますね、公式チュートリアルがすごくわかりやすくて直観的だったし、まあalpha故に別の意味でも度々ハマってますけども。  

ちなみに僕は**Web開発の経験はほとんどない**し**Angular1もよくわかってない**、なんでここに参加してるのかよくわからない出自の者なのですが、
普段は基幹業務系のSIerです。どちらかというとフロントエンドよりサーバーサイドです。Angular2以外に触れたことのあるライブラリと言えばKnockoutとAureliaくらいです。  
なんでWeb開発に手を出してるの？と聞かれたら今のところは「井の中の蛙になりたくないので修行の一環として」としか答えられないですね。はいすみません。

さて来年には正式リリースされる予定のAngular2ですが、一番の注目点はTypeScriptベースで開発されているということです。  
ちょっと前にKnockoutでWeb開発に触れたとき、最初に痛感したのは「型の無いJavaScriptキモイ」ということでした。
仕事でC#をちょこちょこ使うMicrosoft派な僕にとって型が無いから実行時まで構文上のエラーさえ知らされないというのは「そんなん無理じゃん」というぐらい生理的に受け付けないものでした。
そしたらしばらくしてTypeScriptというものが世に出てきまして、そのとき1万だか2万行ぐらい書いてたJavaScriptのコードを夢中でTypeScriptに書き直したことを覚えています。
まあそのときの成果物は今となっては稼働していないので懐かしい昔話なんですけどね。  

前置きが長くなりましたが、そういうわけで僕は型の無い世界は嫌いです。だからNot JavaScript But TypeScriptです。  
そしてせっかくなら新しいもの使いたいじゃないですか。ES6。それにC#出身なんでasync/awaitも使いたいですね。  
そこで今日のテーマは、**こんな環境でAngular2開発したいよね**、です。

* OSはWindows (個人的に好きだから)
* Visual Studio Code (TypeScriptと相性が良さそうだから)
* JavaScriptは余程のことがない限り全てTypeScriptで書く (型が無いと生きられないから)
* TypeScriptのtargetはES6 (新しいしasync/await使えるから)
* TypeScript→ES6→Babelで事前コンパイルする (async/awaitを動かすため)
* モジュールローダーはSystem.js (Angular2の公式チュートリアルがそうだから)
* [5 MIN QUICKSTART](https://angular.io/docs/ts/latest/quickstart.html)とか[TUTORIAL: TOUR OF HEROES](https://angular.io/docs/ts/latest/tutorial/)とか一通りわかる (基礎知識として必要だから)

今日の記事は下記のnpm installがされていることを前提とします。
```
npm install angular2@2.0.0-alpha.47 --save --save-exact 
npm install systemjs --save
npm install typescript babel-preset-es2015 babel-polyfill gulp gulp-typescript gulp-babel gulp-ignore electron-prebuilt --save-dev
```
(Angular2のHttpモジュールがalpha48で正常動作しないのでalpha47を指定してインストールします)

僕が普段使っている`tsconfig.json`ファイルの内容です。今回はこの設定を前提とします。
```
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

## Part1 tsdでインストールされるd.tsファイルがES6対応じゃないなら自力で対応しよう
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
うろ覚えで適当にコード書いてますが、要するにボタンクリック時とかに発火するような関数の中でlodashを使おうとしていると、`window._`が無いとエラーになります。
先ほどの前者はダメで後者なら良いというのはこういうことです。

TypeScriptと付き合っていくときの心得としては、

* 動くなら多少のエラーは無視する。
* 与えられたコードは必要に応じてオーバーライド(?)したり直接上書きしたりする。

というのも必要かなって思いますね。

## Part2 System.jsを使うならconfigは専用ファイルを用意しよう
Angular2の公式チュートリアルで採用されているものが正義です。少なくとも僕の中では。というか他のツールでAngular2を使う方法を知りません。

ところでチュートリアルだとHTMLファイルの中にさらっと`System.config()`が書いてありますが、結構がっつりやるとこれがどんどんボリューム増になります。  
jspmとか使うとこの辺はわりと自動でやってくれるんですけど、せっかくだから**node_modulesフォルダの中身をブラウザ環境で使いまわしたい**し勉強も兼ねて自分で書いた方がいいですね。

これは僕は普段使っているもので、`index.html`ファイルと同じ場所に配置します。
```
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
    'prominence': 'node:prominence/lib/prominence.js',
  },
  packages: {
    'app': { defaultExtension: 'js' },
  },
  meta: {
    'app/*.js': { deps: ['babel-polyfill'] }
  }
});
```
System.jsはブラウザ環境でのimportやrequireをフックする(本来の機能を上書きする)ものなので、
`System.config()`がちゃんと設定されていないと`ts`ファイルで`import _ from 'lodash'`とか書いても無駄ですので注意しましょう。  

## Part3 TypeScript→ES6→Babelで事前コンパイルしよう
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
次の(2)の段階でBabelに通して**ES5のJavaScript**に変換されます。  
これで**async/awaitが動くES5のJavaScriptファイルの完成**です。

処理速度を気にしなければブラウザ上で実行時にBabelで変換するというやり方もあったのですが、
最新版のBabelでは非推奨になっているのと公式サイトからもやり方が消えてしまったので**今後は実行時コンパイルはやるな**、ということなのだと思います。


## Part4 ルーティングを書いてみよう
公式チュートリアルにはルーティングの書き方の説明がないんですよね。    
最もシンプルに説明するにはどうしたらいいかなって思って、下記のコードに辿り着きました。後はこれにゴテゴテ色々付け足していくことになると思います。
```javascript
import {bootstrap, Component, provide} from 'angular2/angular2'
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Location, LocationStrategy, HashLocationStrategy} from 'angular2/router'
import {Page1} from './page1/page1'
import {Page2} from './page2/page2'

@Component({
  selector: 'my-app',
  template: `
    <ul>
      <li><a [router-link]="['/Page1']">PAGE1</a></li>
      <li><a [router-link]="['/Page2']">PAGE2</a></li>
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
`constructor()`でDIしているのはAngular2のお約束みたいなものですね。


## Part5 Httpモジュールを使ってみよう(async/await登場)
公式チュートリアルにはHttpモジュールの使い方も説明されていません。
最もシンプルに説明するにはどうしたら(略
```javascript
import {Component} from 'angular2/angular2'
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http'
import _ from 'lodash'

@Component({
  selector: 'my-page1',
  template: `
    <input type="text" (keyup)="onChangeWord($event)">
    <ul>
      <li *ng-for="#card of cards">{{card.title}} - {{card.body}}</li>
    </ul>
  `,
  providers: [HTTP_PROVIDERS]
})
export class Page1 {
  cards: Card[] = [];
  
  // .....色々省略
  
  onChangeWord(event: KeyboardEvent) {
    const value = event.target.value;
    this.loadCards(value);
  }
  loadCards(searchWord: string = '') {
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
せっかくasync/awaitやってるんだからawaitできるように`toPromise()`でPromise型に変換して返したいよねって思ってこういう結果になりました。


## Part6 ElectronとSystem.jsできっと誰もが嵌ること
Electronのレンダラプロセス(ブラウザ)からメインプロセス(サーバーサイド)のモジュールを使いたいとき、普通にやったらレンダラプロセスではrequireできないんですね。  
(`require('fs')`とか`require('path')`とかもそうです)  
そこでそういうときどうしたら良いか、公式ドキュメントには以下のように説明されています。
```javascript
const remote = require('remote');
const BrowserWindow = remote.BrowserWindow;

var win = new BrowserWindow({ width: 800, height: 600 });
win.loadURL('https://github.com');
```
レンダラプロセス内で`require('remote')`して、remote経由でメインプロセスのモジュールを操作しろ、と。  

さてここで一つ問題が生じます。**System.js**がrequireをフックしているという点です。  
System.jsをモジュールローダーとして使う場合、上記のコードは動作しません。代わりにこういう風に書く必要があります。
```javascript
const remote = System._nodeRequire('remote');
```
あとは公式ドキュメントの通りで大丈夫です。


## まとめ
そもそもWeb開発の最前線にいるわけでもない僕が書いたものなので、ところどころ筋違いなことを書いていたり理解できない部分があったかもしれません。  
各章に参考文献へのリンクも記載しようかなとも思ったのですが、思い出せないものもたくさんあるしほとんど英語なので思い切ってばっさりなくしてしまいました。  



明日は ***** さんです。

ここまで読んでいただいてありがとうございました。