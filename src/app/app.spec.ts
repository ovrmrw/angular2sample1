import {bootstrap, Component, provide} from 'angular2/angular2'
import {Router, Route, RouteConfig, RouterLink, RouterOutlet, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Location, LocationStrategy, HashLocationStrategy} from 'angular2/router'
import {Page1} from '../page1/page1'
import {Page2} from '../page2/page2'
import {App} from './app'

describe('aaa', () => {
  let app: App;
  beforeEach(done => {
    bootstrap(App, [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })])
      .then(result =>{
        console.log(result); 
        return result.instance;
      })
      .then(instance => {
        console.log(instance.router._outlet._componentRef);
        app = instance;
        done();
      })
      .catch(err => console.error(err));
  });

  it('test', () => {
    console.log(app);
    expect(app.state).toEqual("state");
  });
});