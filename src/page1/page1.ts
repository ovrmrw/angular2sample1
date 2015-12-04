import {Component, OnInit, AfterContentInit, AfterViewInit} from 'angular2/angular2'
import {ROUTER_DIRECTIVES} from 'angular2/router'
import {Parent} from '../app/parent'
import {Page2} from '../page2/page2'
import moment from 'moment'
declare var $: JQueryStatic;

const componentSelector = 'my-page1';

@Component({
  selector: componentSelector,
  template: `
    <div class="row">
      <h2>Page1</h2>
      {{nowTime}}
      {{value}}
      {{state}}
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Card Title</span>
            <p>I am a very simple card. I am good at containing small bits of information.
            I am convenient because I require little markup to use effectively.</p>
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
  isRouterActive: boolean = false;
  get nowTime(): string {
    return moment().format();
  }
  get value(): number {
    return 2 ** 4;
  }
  state = "state";
  
  constructor() {
    super();
    console.log(`${componentSelector} constructor`);
    //this.init();
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
  }
}