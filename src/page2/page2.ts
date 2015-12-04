import {Component, OnInit, AfterContentInit, AfterViewInit} from 'angular2/angular2'
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
          <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>
    </div>
  `
})
export class Page2 implements OnInit, AfterContentInit, AfterViewInit {
  static isJQueryPluginsInitialized: boolean = false;

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
      if (!Page2.isJQueryPluginsInitialized) {
        for (let i = 0; i < 100; i++) {
          if ('$' in window) {
            break;
          } else {
            console.log('$ not in window');
            await new Promise(resolve => {
              setTimeout(() => { resolve() }, 100);
            });
          }
        }
        console.log(`${componentSelector} jquery initialized`);
        $(`${componentSelector} .modal-trigger`).leanModal();
        Page2.isJQueryPluginsInitialized = true;
      }
      console.log('async end')
    })();
  }
}