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
      <h2>Page1</h2>
    </div>
    <div class="row">
      <div class="col s6 m4 l3" *ng-for="#card of cards">
        <div class="card yellow lighten-3 waves-effect waves-light" [router-link]="['/Page2']">
          <div class="card-content black-text">
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
  cards: Card[];
  isRouterActive: boolean = false;
      get nowTime(): string {
        return moment().format();
      }
      get value(): number {
        return 2 ** 4;
      }

  loadCards() {
    const remote = System._nodeRequire('remote'); // ElectronのremoteモジュールをSystem.jsからrequireする 
    const jsonfile = remote.require('jsonfile'); // remote経由でrequire('jsonfile')
    const filepath = './cards.json';
    (async () => { // async/awaitでPromiseから値を取り出す
      this.cards = await prominence(jsonfile).readFile(filepath, "utf-8");   
    })();
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
      
    this.loadCards();  
  }
}