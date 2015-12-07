import {bootstrap, Component, provide} from 'angular2/angular2'
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Location, LocationStrategy, HashLocationStrategy} from 'angular2/router'
import {Page1} from '../page1/page1'
import {Page2} from '../page2/page2'

@Component({
  selector: 'my-app',
  template: `
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo right">Angular2 Sample1</a>
        <ul id="nav-mobile" class="left hide-on-small-and-down"><!-- classにhide-on-med-and-downを設定するとElectronで表示されない -->
          <li id="nav1" [class.active]="getLinkStyle('/p1')"><a [router-link]="['/Page1']" class="waves-effect waves-light"><i class="material-icons left">view_module</i>Card List</a></li>
          <li id="nav2" [class.active]="getLinkStyle('/p2')"><a [router-link]="['/Page2']" class="waves-effect waves-light"><i class="material-icons left">description</i>Card Editor</a></li>
        </ul>
      </div>
    </nav>
    <router-outlet></router-outlet>
    <footer class="page-footer">
      <div class="container">
        <div class="row">
          <div class="col l6 s12">
            <h5 class="white-text">Footer Content</h5>
            <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
          </div>
          <div class="col l4 offset-l2 s12">
            <h5 class="white-text">Links</h5>
            <ul>
              <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
              <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <div class="container">
        © 2015 Copyright Text
        <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
        </div>
      </div>
    </footer>
  `,
  directives: [Page1, Page2, ROUTER_DIRECTIVES]
})
@RouteConfig([
  new Route({ path: '/p1', component: Page1, name: 'Page1', useAsDefault: true }),
  new Route({ path: '/p2', component: Page2, name: 'Page2' }),
])
export class App {
  location: Location;
  router: Router;
  constructor(location: Location, router: Router) {
    this.location = location;
    this.router = router;
  }
  onClick(event){
    console.log(event);
    console.log(this.router);
    console.log(this.location);
  }
  getLinkStyle(path) {
    if (path === this.location.path()) {
      return true;
    }
    else if (path.length > 0) {
      return this.location.path().indexOf(path) > -1;
    }
  }
}
bootstrap(App, [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })])
  .catch(err => console.error(err));