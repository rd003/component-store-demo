import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CounterStore } from "./counter.store";

@Component({
  selector: "app-counter",
  standalone: true,
  imports: [CommonModule],
  providers: [CounterStore],
  template: `
    <button (click)="increment()">Increment</button>
    <span style="font-size:20px;">{{ count$ | async }}</span>
    <button (click)="decrement()">Decrement</button>
  `,
  styles: [],
})
export class CounterComponent {
  store = inject(CounterStore);

  count$ = this.store.count$;

  increment() {
    this.store.increment();
  }
  decrement() {
    this.store.decrement();
  }
}
