import {Observable} from 'angular2/angular2'
import {OnDeactivate} from 'angular2/router'
import {Subscription} from '@reactivex/rxjs'

export abstract class AppParent implements OnDeactivate {
  private static _isJQueryPluginsInitialized: boolean = false;
  protected get isJQueryPluginsInitialized() {
    return AppParent._isJQueryPluginsInitialized;
  }
  protected set isJQueryPluginsInitialized(flag: boolean) {
    AppParent._isJQueryPluginsInitialized = flag;
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
    this._disposableSubscriptions = [];
  }

  protected abstract initJQueryPlugins(): void;
  protected abstract initEventObservables(): void;
}