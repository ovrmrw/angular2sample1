import {Component, OnInit, AfterContentInit, AfterViewInit, Observable} from 'angular2/angular2'
import {ROUTER_DIRECTIVES, CanDeactivate, ComponentInstruction, OnDeactivate} from 'angular2/router'
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http'
import {AppParent} from '../app/app-parent'
import {Page2} from '../page2/page2'
import _ from 'lodash'
declare var $: JQueryStatic;
declare var Materialize: any;

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
      <div class="col s12">
        <!-- Modal Trigger -->
        <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
  
        <!-- Modal Structure -->
        <div id="modal1" class="modal">
          <div class="modal-content">
            <h4>Modal Header Page1</h4>
            <p>A bunch of text</p>
            <h3>{{now | date:'yyyy-MM-dd HH:mm:ss'}}</h3>
          </div>
          <div class="modal-footer">
            <a class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
      </div>
    </div>
  `,
  directives: [Page2, ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS]
})
export class Page1 extends AppParent
  implements AfterViewInit, AfterContentInit, OnInit, CanDeactivate, OnDeactivate {

  static _searchWord: string = '';
  get searchWord() {
    return Page1._searchWord;
  }
  set searchWord(word: string) {
    Page1._searchWord = word;
  }
  cards: Card[] = [];
  now: number;

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
    super.initPluginsAndObservables(componentSelector);
    
    this.loadCards(this.searchWord);
    document.getElementById('searchWord').focus();
  }
  routerOnDeactivate() {
    super.routerOnDeactivate();
  }
  routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
    //return confirm('Are you sure you want to leave?');    
  }

  loadCards(searchWord: string = ''): void {
    (async() => {
      let cards: Card[] = await this.http.get('../cards.json')
        .map((res: Response) => res.json() as Card[])
        .toPromise(Promise);
      if (searchWord) {
        const words: string[] = _.chain(searchWord.replace(/[　]/g, ' ').split(' '))
          .map(word => _.trim(word))
          .filter(word => word.length > 0)
          .value();
        console.log(words);
        words.forEach(word => {
          cards = _.filter(cards, card => {
            return _.some([card.title, card.body], value => value.indexOf(word) > -1);
          });
        });
      }
      this.cards = cards;
    })();
  }

  initializableJQueryPlugins(): void {
    $(`${componentSelector} .modal-trigger`).leanModal();
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
        this.now = _.now();
      });
  }
}

