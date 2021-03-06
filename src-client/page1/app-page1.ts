import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Http, Response, HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppPageParent} from '../app/app-parent';
import {AppPage2} from '../page2/app-page2';
import lodash from 'lodash';
declare var jQuery: JQueryStatic;

const componentSelector = 'my-page1';
@Component({
  selector: componentSelector,
  template: `
    <div class="row">
      <div class="col s3 offset-s9">
        {{now | date:'yyyy-MM-dd HH:mm:ss'}}
      </div>
    </div>
    <div class="row">
      <div class="col s12 m12 l4">
        <h3 id="cardlist">Card List</h3>
      </div>
      <form class="col s12 m12 l8">
        <div class="row">
          <div class="input-field col s12">
            <input id="searchWord" [(ngModel)]="searchWord" type="text" class="validate">
            <label for="searchWord">Search Word</label>
          </div>
        </div>
      </form>
    </div>
    <div class="row" *ngIf="cards && cards.length > 0">
      <div class="col s6 m4 l3" *ngFor="let card of cards">
        <div class="card orange darken-2 waves-effect waves-light" [routerLink]="['/Page2']">
          <div class="card-content white-text">
            <span class="card-title">{{card.title}}</span>
            <p>{{card.body}}</p>
          </div>
          <div class="card-action">
            <a [routerLink]="['/Page2']">Card Editor</a>
          </div>
        </div>
      </div>
    </div>
    <div class="row" *ngIf="cards && cards.length == 0">
      <div class="col s12">
        <h3 class="pink lighten-2 white-text">No Results</h3>
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <!-- Modal Trigger -->
        <a class="waves-effect waves-light btn modal-trigger" href="#modal1">push this button</a>  
        <!-- Modal Structure -->
        <div id="modal1" class="modal">
          <div class="modal-content">
            <h4>説明</h4>
            <p>Search Word欄に文字を入力するとカードの内容にヒットするものだけ絞り込んで表示します。</p>
            <p>検索(抽出)ボタンはありません。キーボード入力が止まって1秒したら自動的に検索(抽出)が始まります。</p>
            <h4>{{now | date:'yyyy-MM-dd HH:mm:ss'}}</h4>
          </div>
          <div class="modal-footer">
            <a class=" modal-action modal-close waves-effect waves-green btn-flat">OK</a>
          </div>
        </div>
      </div>
    </div>
  `,
  directives: [AppPage2, ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS]
})
export class AppPage1 extends AppPageParent implements OnInit {
  static _searchWord: string = '';
  get searchWord() { return AppPage1._searchWord; }
  set searchWord(word: string) { AppPage1._searchWord = word; }
  cards: Card[] = [];
  now: number;

  constructor(public http: Http) {
    super(componentSelector);
    console.log(`${componentSelector} constructor`);
  }
  ngOnInit() {
    super.ngOnInit();
    console.log(`${componentSelector} onInit`);
    this.loadCards(this.searchWord);
    document.getElementById('searchWord').focus();
  }

  initializableJQueryPlugins(): void {
    jQuery(`${componentSelector} .modal-trigger`).leanModal();
  }
  initializableEventObservables(): void {
    this.disposableSubscription = Observable.fromEvent(document.getElementById('searchWord'), 'keyup')
      .map((event: KeyboardEvent) => event.target.value)
      .debounce(() => Observable.timer(1000))
      .subscribe((value: string) => {
        this.loadCards(value); // わざわざEventからvalueを取り出さなくても this.searchWord でも良い。
        Materialize.toast(`Searching with word '${value}' triggered`, 2000);
      });

    this.disposableSubscription = Observable.timer(1, 1000)
      .subscribe(() => {
        this.now = lodash.now();
      });

    this.disposableSubscription = Observable.fromEvent(document.getElementsByTagName(componentSelector), 'click')
      .map((event: MouseEvent) => event.target.textContent)
      .filter(text => lodash.trim(text).length > 0)
      .subscribe(text => {
        console.log(`${componentSelector} ${text}`);
        Materialize.toast(`You clicked "${text}"`, 1000);
      });
  }

  loadCards(searchWord: string = ''): void {
    (async () => {
      let cards: Card[] = await this.http.get('../cards.json')
        .map((res: Response) => res.json() as Card[])
        .toPromise(Promise);
      if (searchWord) {
        const words: string[] = lodash.chain(searchWord.replace(/[　]/g, ' ').split(' '))
          .map(word => lodash.trim(word))
          .filter(word => word.length > 0)
          .value();
        console.log(words);
        words.forEach(word => {
          cards = lodash.filter(cards, card => {
            return lodash.some([card.title, card.body], value => value.indexOf(word) > -1);
          });
        });
      }
      this.cards = cards;
    })();
  }
}