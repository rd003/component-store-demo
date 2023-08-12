import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <ul class="nav">
      <li><a routerLink="/home">Home</a></li>
      <li><a routerLink="/counter">Counter</a></li>
      <li><a routerLink="/person">Person</a></li>
      <li><a routerLink="/movies">Movies</a></li>
    </ul>
    <div style="padding:20px">
      <router-outlet />
    </div>
  `,
  styles: [
    `
      .nav {
        display: flex;
        gap: 30px;
        background-color: black;
        padding: 15px;
      }
      .nav li {
        list-style: none;
      }
      .nav li a {
        text-decoration: none;
        color: white;
        font-size: 18px;
      }
    `,
  ],
})
export class AppComponent {}
