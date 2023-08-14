import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PersonStore } from "./person.store";
import { generateGuid } from "../utils/utils";
import { Person } from "./person.model";

@Component({
  selector: "app-person",
  standalone: true,
  imports: [CommonModule],
  providers: [PersonStore],
  template: `
    <h2>Peoples 🕴️🙆</h2>
    <ng-container *ngIf="people$ | async as people">
      <ul class="people-list">
        <li *ngFor="let person of people">
          👉{{ person.name }} | {{ person.email }}
        </li>
      </ul>

      <button class="btn" (click)="addPerson()">➕ Add more</button>
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
export class PersonComponent {
  store = inject(PersonStore);
  people$ = this.store.people$;

  addPerson() {
    const person: Person = {
      id: generateGuid(),
      name: "ravindra",
      email: "ravindra@xyz.com",
    };
    // calling the addPerson method from store
    this.store.addPerson(person);
  }
}
