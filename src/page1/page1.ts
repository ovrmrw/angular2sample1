import {Component, OnInit, AfterContentInit, AfterViewInit, Observable} from 'angular2/angular2'
import {ROUTER_DIRECTIVES, CanDeactivate, ComponentInstruction} from 'angular2/router'
import {Http,Response, HTTP_PROVIDERS} from 'angular2/http'
import {Parent} from '../app/parent'
import {Page2} from '../page2/page2'
import moment from 'moment'
import _ from 'lodash'
import numeral from 'numeral'
import prominence from 'prominence'
declare var $: JQueryStatic;
declare var Materialize: any;

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
            <input id="searchWord" type="text" class="validate" (keyup)="onChangeWord($event)">
            <!-- <input id="searchWord" type="text" class="validate"> -->
            <label for="searchWord">Search Word</label>
          </div>
        </div>
      </form>
    </div>
    <!--<div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input id="searchWord" type="text" class="validate" (keyup)="onChangeWord($event)">
            <input id="searchWord" type="text" class="validate">
            <label for="searchWord">Search Word</label>
          </div>
        </div>
      </form>
    </div>-->
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
  providers:[HTTP_PROVIDERS]
})
export class Page1 extends Parent implements AfterViewInit, AfterContentInit, OnInit, CanDeactivate {
  static isJQueryPluginsInitialized: boolean = false;
  static isEventObservableInitialized: boolean = false;
  static savedWord: string = '';
  cards: Card[] = [];
  //cards: Promise<Card[]>;
 
  constructor(public http: Http) {
    super();
    console.log(`${componentSelector} constructor`);     
    // Observable.range(1,10)
    //   //.map(i => console.log('Observable map ' + i));
    //   .toArray()
    //   .subscribe(i => console.log(i));
  }
  ngOnInit(){
    console.log(`${componentSelector} onInit`);    
  }
  ngAfterContentInit() {
    console.log(`${componentSelector} afterContentInit`);    
  }
  ngAfterViewInit() {
    console.log(`${componentSelector} afterViewInit`);
    if (!Page1.isJQueryPluginsInitialized) {
      Page1.isJQueryPluginsInitialized = this.initJQueryPlugins(componentSelector);      
    }
    if (!Page1.isEventObservableInitialized){
      Page1.isEventObservableInitialized = this.initEventObservables();  
    }    
    const value = Page1.savedWord;
    this.loadCards(value);
    $('#searchWord').focus();
  }
  
  routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
    return confirm('Are you sure you want to leave?');    
  }
  
  onChangeWord(event:KeyboardEvent) {
    const value = event.target.value;
    this.loadCards(value);
    Page1.savedWord = value;    
  }
  
  loadCards(searchWord: string = ''): void {
    console.log('loadCards:' + searchWord);
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
      console.log(cards);
      this.cards = cards;      
    })();
  }

  initEventObservables() {
    // Observable.fromEvent($('#searchWord'), 'keyup')
    //   .map((event: KeyboardEvent) => event.target.value)
    //   .filter(value => value.length > 0)
    //   .debounce<string>(() => Observable.timer(1000))
    //   .subscribe(value => {
    //     console.log('Observable value: ' + value);
    //     this.loadCards(value);
    //     Page1.savedWord = value;
    //     Materialize.toast(`Searching with word '${value}' triggered`, 2000);
    //   });
    return true;
  }
}