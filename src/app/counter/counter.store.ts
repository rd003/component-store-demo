import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";

interface CounterState {
  count: number;
}

@Injectable()
export class CounterStore extends ComponentStore<CounterState> {
  constructor() {
    super({ count: 0 });
  }

  readonly count$ = this.select((s) => s.count);

  readonly increment = this.updater((state) => ({ count: state.count + 1 }));
  readonly decrement = this.updater((state) => ({ count: state.count - 1 }));
}
