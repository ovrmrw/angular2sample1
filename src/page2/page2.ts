import {Component, OnInit, AfterContentInit, AfterViewInit} from 'angular2/angular2'
import {ROUTER_DIRECTIVES, CanDeactivate, ComponentInstruction, OnDeactivate} from 'angular2/router'
import {AppParent} from '../app/app-parent'
declare var $: JQueryStatic;

const componentSelector = 'my-page2';

@Component({
  selector: componentSelector,
  template: `
    <div class="row">
      <div class="col s12">
        <h3>Other Pages</h3>
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <!-- Modal Trigger -->
        <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Push this button</a>
  
        <!-- Modal Structure -->
        <div id="modal1" class="modal">
          <div class="modal-content">
            <h4>Modal Title</h4>
            <p>このページには何もありません。</p>
            <p>Card Listのページに戻ってjqueryプラグインとイベントハンドラが正常動作することを確認してください。</p>
          </div>
          <div class="modal-footer">
            <a class=" modal-action modal-close waves-effect waves-green btn-flat">OK</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class Page2 extends AppParent
  implements OnInit, AfterContentInit, AfterViewInit, OnDeactivate {

  constructor() {
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
  }
  routerOnDeactivate() {
    super.routerOnDeactivate();
  }

  initializableJQueryPlugins(): void {
    $(`${componentSelector} .modal-trigger`).leanModal();
  }
  initializableEventObservables(): void {
  }
}