import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-person",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Peoples 🕴️🙆</h2>
    <ng-container *ngIf="true">
      <ul class="people-list">
        <li *ngFor="let person of [1, 2, 3, 4]">👉name | email</li>
      </ul>

      <button class="btn">➕ Add more</button>
    </ng-container>
  `,
  styles: [
    `
      .people-list {
        margin: 8px 0px;
      }
      .people-list li {
        list-style: none;
        font-size: 20px;
      }
    `,
  ],
})
export class PersonComponent {}
