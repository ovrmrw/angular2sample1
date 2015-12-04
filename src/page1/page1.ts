import {Component, OnInit, AfterContentInit, AfterViewInit} from 'angular2/angular2'
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
          <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>
    </div>
  `
})
export class Page1 implements AfterViewInit, AfterContentInit, OnInit {
  static isJQueryPluginsInitialized: boolean = false;
  get nowTime(): string {
    return moment().format();
  }
  get value(): number {
    return 2 ** 1;
  }
  state = "state";
  
  constructor() {
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
    this.initJQueryPlugins();    
  }
  initJQueryPlugins() {
    (async() => {
      console.log('async start')
      if (!Page1.isJQueryPluginsInitialized) {
        // for (let i = 0; i < 100; i++) {
        //   if ('$' in window) {
        //     break;
        //   } else {
        //     console.log('$ not in window');
        //     await new Promise(resolve => {
        //       setTimeout(() => { resolve() }, 100);
        //     });
        //   }
        // }
        console.log(`${componentSelector} jquery initialized`);
        $(`${componentSelector} .modal-trigger`).leanModal();
        Page1.isJQueryPluginsInitialized = true;
      }
      console.log('async end')
    })();
  }
}