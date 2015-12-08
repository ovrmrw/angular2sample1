import {Observable} from 'angular2/angular2'
import {OnDeactivate} from 'angular2/router'
import {Subscription} from '@reactivex/rxjs'
declare var $: JQueryStatic;

export class AppParent implements OnDeactivate {
  disposableSubscriptions: Subscription<any>[] = [];
  set setDisposableSubscription(subscription: Subscription<any>) {
    this.disposableSubscriptions.push(subscription);
  }

  routerOnDeactivate() {
    console.log('dispose subscriptions');
    this.disposeSubscriptions();
  }

  disposeSubscriptions(): void {
    this.disposableSubscriptions.forEach(s => {
      if (!s.isUnsubscribed) {
        s.unsubscribe();
      }
    });
    this.disposableSubscriptions = [];
  }
}