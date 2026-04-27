import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { menuItems } from '../../app.routes';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
})
export class NavBar {
  public readonly menuItems = menuItems;
}
