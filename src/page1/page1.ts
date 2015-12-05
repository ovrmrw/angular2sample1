import {Component, OnInit, AfterContentInit, AfterViewInit} from 'angular2/angular2'
import {ROUTER_DIRECTIVES} from 'angular2/router'
import {Parent} from '../app/parent'
import {Page2} from '../page2/page2'
import moment from 'moment'
import _ from 'lodash'
import numeral from 'numeral'
import prominence from 'prominence'
declare var $: JQueryStatic;

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
            <label for="searchWord">Search Word</label>
          </div>
        </div>
      </form>
    </div>-->
    <div class="row" *ng-if="cards.length > 0">
      <div class="col s6 m4 l3" *ng-for="#card of cards">
        <div class="card orange darken-2 waves-effect waves-light" [router-link]="['/Page2']">
          <div class="card-content white-text">
            <span class="card-title">{{card.title}}</span>
            <p>{{card.body}}</p>
          </div>
          <div class="card-action">
            <a [router-link]="['/Page2']">This is a link</a>
            <a [router-link]="['/Page2']">This is a link</a>
          </div>
        </div>
      </div>
    </div>
    <div class="row" *ng-if="cards.length == 0">
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
  directives: [Page2, ROUTER_DIRECTIVES]
})
export class Page1 extends Parent implements AfterViewInit, AfterContentInit, OnInit {
  static isJQueryPluginsInitialized: boolean = false;
  static savedWord: string = '';
  cards: Card[] = [];

  loadCards(searchWord: string = '') {
    const remote = System._nodeRequire('remote'); // ElectronのremoteモジュールをSystem.jsからrequireする 
    const jsonfile = remote.require('jsonfile'); // remote経由でrequire('jsonfile')
    const filepath = './cards.json';
    (async() => { // async/awaitでPromiseから値を取り出す
      let cards = await prominence(jsonfile).readFile(filepath, "utf-8") as Card[];
      if (searchWord) {
        const words = _.words(searchWord);
        console.log(words);
        words.forEach(word => {
          cards = _.filter(cards, card => {
            return card.title.indexOf(word) > -1 || card.body.indexOf(word) > -1;
          });
        });
        this.cards = cards;
      } else {
        this.cards = cards;
      }
    })();
  }

  onChangeWord(event:KeyboardEvent) {
    const value = event.target.value;
    this.loadCards(value);
    Page1.savedWord = value;
  }
  
  constructor() {
    super();
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
    if(!Page1.isJQueryPluginsInitialized)
      Page1.isJQueryPluginsInitialized = this.initJQueryPlugins(componentSelector);    
    
    const value = Page1.savedWord;
    this.loadCards(value);  
    $('#searchWord').focus();
  }
}