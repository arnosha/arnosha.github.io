import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DrawerSelectEvent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  items: Array<any> = this.mapItems(this.router.config);

  constructor(private router: Router) {}

  public onSelect(ev: DrawerSelectEvent): void {
    this.router.navigate([ev.item.path]);
  }

  public mapItems(routes: any[]): any[] {
    return routes.map((item) => {
      return {
        text: item.text,
        icon: item.icon,
        path: item.path ? item.path : '',
        selected: item.path === window.location.pathname.slice(1),
      };
    });
  }
}
