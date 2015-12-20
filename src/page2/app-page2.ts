import {Component, OnInit, AfterContentInit, AfterViewInit} from 'angular2/core'
import {ROUTER_DIRECTIVES, CanDeactivate, ComponentInstruction, OnDeactivate} from 'angular2/router'
import {Observable} from 'rxjs/Observable'
import {AppPageParent} from '../app/app-parent'
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
export class AppPage2 extends AppPageParent
  implements OnInit, AfterContentInit, AfterViewInit, OnDeactivate {

  constructor() {
    super(componentSelector);
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
    //super.initPluginsAndObservables(componentSelector);
    //super.ngAfterViewInit();
  }
  routerOnDeactivate() {
    console.log(`${componentSelector} onDeactivate`);
    super.routerOnDeactivate();
  }

  initializableJQueryPlugins(): void {
    $(`${componentSelector} .modal-trigger`).leanModal();
  }
  initializableEventObservables(): void {
    this.disposableSubscription = Observable.fromEvent(document, 'click')     
      .map((event: MouseEvent) => event.target.textContent)
      .filter(text => _.trim(text).length > 0)      
      .subscribe(text => {
        console.log(`${componentSelector} ${text}`);
        Materialize.toast(`You clicked "${text}"`, 1000);
      });
  }
}