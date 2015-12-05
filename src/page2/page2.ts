import {Component, OnInit, AfterContentInit, AfterViewInit} from 'angular2/angular2'
import {Parent} from '../app/parent'
declare var $: JQueryStatic;

const componentSelector = 'my-page2';

@Component({
  selector: componentSelector,
  template: `
    <div class="row">
      <h2>Page2</h2>
    </div>
    <div class="row">
      <!-- Modal Trigger -->
      <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>

      <!-- Modal Structure -->
      <div id="modal1" class="modal">
        <div class="modal-content">
          <h4>Modal Header Page2</h4>
          <p>A bunch of text</p>
        </div>
        <div class="modal-footer">
          <a class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>
    </div>
  `
})
export class Page2 extends Parent implements OnInit, AfterContentInit, AfterViewInit {
  static isJQueryPluginsInitialized: boolean = false;

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
    if(!Page2.isJQueryPluginsInitialized)
      Page2.isJQueryPluginsInitialized = this.initJQueryPlugins(componentSelector);    
  }
}