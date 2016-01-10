import {OnInit, OnDestroy} from 'angular2/core'
import {Subscription} from 'rxjs/Subscription'

export abstract class AppPageParent implements OnInit, OnDestroy {
  // private static _initializedJQueryPluginSelectors: string[] = [];
  // private get initializedJQueryPluginSelectors() {
  //   return AppPageParent._initializedJQueryPluginSelectors;
  // }
  // private set initializedJQueryPluginSelector(selector: string) {
  //   AppPageParent._initializedJQueryPluginSelectors.push(selector);
  // }

  private _disposableSubscriptions: Subscription<any>[] = [];
  private get disposableSubscriptions() {
    return this._disposableSubscriptions;
  }
  protected set disposableSubscription(subscription: Subscription<any>) {
    this._disposableSubscriptions.push(subscription);
  }

  constructor(private componentSelector: string) {
    //this.initPluginsAndObservables(this.componentSelector);
  }
  ngOnInit(){
    this.initPluginsAndObservables(this.componentSelector);
  }
  ngOnDestroy() {
    this.disposeSubscriptions(this.componentSelector);
  }

  private disposeSubscriptions(selector: string): void {
    console.log(`${selector} disposeSubscriptions`);
    this.disposableSubscriptions.forEach(subscription => {
      if (!subscription.isUnsubscribed) {
        subscription.unsubscribe();
      }
    });
    this._disposableSubscriptions = void 0;
  }

  private initPluginsAndObservables(selector: string): void {
    console.log(`${selector} initPluginsAndObservables`);
    // if (_.indexOf(this.initializedJQueryPluginSelectors, selector) === -1) {
    //   this.initializableJQueryPlugins();
    //   this.initializedJQueryPluginSelector = selector;
    // }
    this.initializableJQueryPlugins();
    this.initializableEventObservables();
  }

  protected abstract initializableJQueryPlugins(): void;
  protected abstract initializableEventObservables(): void;
}