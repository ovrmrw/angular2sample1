import {OnDeactivate} from 'angular2/router'
import {Subscription} from '@reactivex/rxjs' // alpha.47の場合は'@reactivex/rxjs'
import _ from 'lodash'

export abstract class AppParent implements OnDeactivate {
  private static _initializedJQueryPluginSelectors: string[] = [];
  private get initializedJQueryPluginSelectors() {
    return AppParent._initializedJQueryPluginSelectors;
  }
  private set initializedJQueryPluginSelector(selector: string) {
    AppParent._initializedJQueryPluginSelectors.push(selector);
  }

  private _disposableSubscriptions: Subscription<any>[] = [];
  private get disposableSubscriptions() {
    return this._disposableSubscriptions;
  }
  protected set disposableSubscription(subscription: Subscription<any>) {
    this._disposableSubscriptions.push(subscription);
  }

  routerOnDeactivate() {
    this.disposeSubscriptions();
  }

  private disposeSubscriptions(): void {
    console.log('disposeSubscriptions');
    this.disposableSubscriptions.forEach(subscription => {
      if (!subscription.isUnsubscribed) {
        subscription.unsubscribe();
      }
    });
    this._disposableSubscriptions = void 0;
  }

  protected initPluginsAndObservables(selector: string): void {
    console.log(`${selector} initPluginsAndObservables`);
    if (_.indexOf(this.initializedJQueryPluginSelectors, selector) === -1) {
      this.initializableJQueryPlugins();
      this.initializedJQueryPluginSelector = selector;
    }
    this.initializableEventObservables();
  }

  protected abstract initializableJQueryPlugins(): void;
  protected abstract initializableEventObservables(): void;
}