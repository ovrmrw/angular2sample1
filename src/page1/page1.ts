import {Component, OnInit, AfterContentInit, AfterViewInit, Observable} from 'angular2/angular2'
import {ROUTER_DIRECTIVES, CanDeactivate, ComponentInstruction, OnDeactivate} from 'angular2/router'
import {Http,Response, HTTP_PROVIDERS} from 'angular2/http'
import {AppParent} from '../app/parent'
import {Page2} from '../page2/page2'
import moment from 'moment'
import _ from 'lodash'
import numeral from 'numeral'
import prominence from 'prominence'
declare var $: JQueryStatic;
declare var Materialize: any;
declare interface Subscription{
  isUnsubscribed: boolean,
  unsubscribe: ()=>void  
}

const componentSelector = 'my-page1';

@Component({
  selector: componentSelector,
  template: `
    <div class="row">
      <div class="col s12 m12 l4">
        <h3>Card List</h3>
      </div>
      <form class="col s12 m12 l8">
        <div class="row">
          <div class="input-field col s12">
            <!-- <input id="searchWord" type="text" class="validate" (keyup)="onChangeWord($event)"> -->
            <input id="searchWord" [(ng-model)]="searchWord" type="text" class="validate">
            <label for="searchWord">Search Word</label>
          </div>
        </div>
      </form>
    </div>
    <div class="row" *ng-if="cards && cards.length > 0">
      <div class="col s6 m4 l3" *ng-for="#card of cards">
        <div class="card orange darken-2 waves-effect waves-light" [router-link]="['/Page2']">
          <div class="card-content white-text">
            <span class="card-title">{{card.title}}</span>
            <p>{{card.body}}</p>
          </div>
          <div class="card-action">
            <a [router-link]="['/Page2']">Card Editor</a>
          </div>
        </div>
      </div>
    </div>
    <div class="row" *ng-if="cards && cards.length == 0">
      <div class="col s12">
        <h3 class="pink lighten-2 white-text">No Results</h3>
      </div>
    </div>
    <div class="row">
      <!-- Modal Trigger -->
      <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>

      <!-- Modal Structure -->
      <div id="modal1" class="modal">
        <div class="modal-content">
          <h4>Modal Header Page1</h4>
          <p>A bunch of text</p>
          <h2>{{nowTime}}</h2>
        </div>
        <div class="modal-footer">
          <a class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>
    </div>
  `,
  directives: [Page2, ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS]
})
export class Page1 extends AppParent
  implements AfterViewInit, AfterContentInit, OnInit, CanDeactivate, OnDeactivate {
  static isJQueryPluginsInitialized: boolean = false;
  static savedWord: string = '';
  searchWord: string = '';
  cards: Card[] = [];

  constructor(public http: Http) {
    super();
    console.log(`${componentSelector} constructor`);
  }
  ngOnInit() {
    console.log(`${componentSelector} onInit`);
  }
  ngAfterContentInit() {
    console.log(`${componentSelector} afterContentInit`);
  }
  ngAfterViewInit() {
    console.log(`${componentSelector} afterViewInit`);
    if (!Page1.isJQueryPluginsInitialized) {
      this.initJQueryPlugins(componentSelector);
      Page1.isJQueryPluginsInitialized = true;
    }
    this.initEventObservables(); // Observable.fromEvent()を初期化。
    
    this.searchWord = Page1.savedWord;
    this.loadCards(this.searchWord);
    document.getElementById('searchWord').focus();
  }

  routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
    //return confirm('Are you sure you want to leave?');    
  }
  routerOnDeactivate() {    
    super.routerOnDeactivate();
    Page1.savedWord = this.searchWord;
  }
  
  loadCards(searchWord: string = ''): void {
    (async() => {
      let cards: Card[] = await this.http.get('/cards.json')
        .map((res: Response) => res.json() as Card[])
        .toPromise(Promise);
      if (searchWord) {
        const words: string[] = _.words(searchWord);
        words.forEach(word => {
          cards = _.filter(cards, card => {
            return card.title.indexOf(word) > -1 || card.body.indexOf(word) > -1;
          });
        });
      }
      this.cards = cards;
    })();
  }

  initJQueryPlugins(selector: string): void {
    $(`${selector} .modal-trigger`).leanModal();
  }
  initEventObservables(): void {
    this.setDisposableSubscription = Observable.fromEvent(document.getElementById('searchWord'), 'keyup')
      .map((event: KeyboardEvent) => event.target.value)
    //.filter(value => value.length > 0)
      .debounce<string>(() => Observable.timer(1000))
      .subscribe(value => {
        this.loadCards(value);
        Materialize.toast(`Searching with word '${value}' triggered`, 2000);
      });
  }
}