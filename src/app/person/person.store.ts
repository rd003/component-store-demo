import { Injectable } from "@angular/core";
import { Person } from "./person.model";
import { ComponentStore } from "@ngrx/component-store";

interface PersonState {
  readonly people: Person[];
}

@Injectable()
export class PersonStore extends ComponentStore<PersonState> {
  constructor() {
    super({ people: [] });
    this.loadPeople();
  }
  readonly people$ = this.select((s) => s.people);

  readonly addPerson = this.updater((state, person: Person) => ({
    ...state,
    people: [...state.people, person],
  }));

  private loadPeople() {
    const people: Person[] = [
      {
        id: "unique1",
        name: "john",
        email: "john@gmail.com",
      },
      {
        id: "unique2",
        name: "alice",
        email: "alice@yahoo.com",
      },
      {
        id: "unique3",
        name: "steve",
        email: "steve@gmail.com",
      },
    ];

    this.setState({ people });
  }
}
