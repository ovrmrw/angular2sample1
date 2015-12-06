import {bootstrap, Component, provide} from 'angular2/angular2'
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Location, LocationStrategy, HashLocationStrategy} from 'angular2/router'
import {Page1} from '../page1/page1'
import {Page2} from '../page2/page2'

@Component({
  selector: 'my-app',
  template: `
    <ul>
      <li><a [router-link]="['/Page1']">PAGE1</a></li>
      <li><a [router-link]="['/Page2']">PAGE2</a></li>
    </ul>
    <router-outlet></router-outlet>
  `,
  directives: [Page1, Page2, ROUTER_DIRECTIVES]
})
@RouteConfig([
  new Route({ path: '/p1', component: Page1, name: 'Page1', useAsDefault: true }),
  new Route({ path: '/p2', component: Page2, name: 'Page2' }),
])
export class App {
  constructor(public location: Location, public router: Router) {
  }
}
bootstrap(App, [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);