import {Component, OnInit} from 'angular2/core'
import {Observable} from 'rxjs/Observable'
import {AppPageParent} from '../app/app-parent'
declare var jQuery: JQueryStatic;

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
            <p>このページには何もありません。（jQuery UIのDatepickerが動作するだけです）</p>
            <p>Card Listのページに戻ってjqueryプラグインとイベントハンドラが正常動作することを確認してください。</p>
          </div>
          <div class="modal-footer">
            <a class=" modal-action modal-close waves-effect waves-green btn-flat">OK</a>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <input id="datepicker" [(ngModel)]="pickedDate" type="text" class="validate">
        <label for="datepicker">Date</label>
      </div>
    </div>
  `
})
export class AppPage2 extends AppPageParent implements OnInit {
  static _pickedDate: string = '';
  get pickedDate() { return AppPage2._pickedDate; }
  set pickedDate(date: string) { AppPage2._pickedDate = date; }

  constructor() {
    super(componentSelector);
    console.log(`${componentSelector} constructor`);
  }
  ngOnInit() {
    super.ngOnInit();
    console.log(`${componentSelector} onInit`);
    document.getElementById('datepicker').focus();
  }

  initializableJQueryPlugins(): void {
    jQuery(`${componentSelector} .modal-trigger`).leanModal();
    jQuery(`${componentSelector} #datepicker`).datepicker({
      onSelect: date => this.pickedDate = date
    });
  }
  initializableEventObservables(): void {
    this.disposableSubscription = Observable.fromEvent<MouseEvent>(document.getElementsByTagName(componentSelector), 'click')
      .map(event => event.target.textContent)
      .filter(text => _.trim(text).length > 0)
      .subscribe(text => {
        console.log(`${componentSelector} ${text}`);
        Materialize.toast(`You clicked "${text}"`, 1000);
      });
  }
}