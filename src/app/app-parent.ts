import {Observable} from 'angular2/angular2'
import {OnDeactivate} from 'angular2/router'
import {Subscription} from '@reactivex/rxjs'
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
    console.log('dispose subscriptions');
    this.disposeSubscriptions();
  }

  private disposeSubscriptions(): void {
    this.disposableSubscriptions.forEach(subscription => {
      if (!subscription.isUnsubscribed) {
        subscription.unsubscribe();
      }
    });
  }

  protected initPluginsAndObservables(selector: string): void {
    if (_.indexOf(this.initializedJQueryPluginSelectors, selector) === -1) {
      this.initializableJQueryPlugins();
      this.initializedJQueryPluginSelector = selector;
    }
    this.initializableEventObservables();
  }

  protected abstract initializableJQueryPlugins(): void;
  protected abstract initializableEventObservables(): void;
}