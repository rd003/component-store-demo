import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MovieStore } from "./movie.store";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Movie } from "./movie.model";
import { generateGuid } from "../utils/utils";

@Component({
  selector: "app-movie",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [MovieStore],
  template: `
    <h2>Movies</h2>
    <ng-container *ngIf="vm$ | async as vm">
      <div style="margin:8px 0px" *ngIf="vm.loading">loading....</div>
      <div style="margin:8px 0px" *ngIf="vm.error">Something went wrong</div>
      <ul *ngIf="vm.movies">
        <li *ngFor="let movie of vm.movies">
          👉 {{ movie.title }} ({{ movie.year }}) ||
          <a style="cursor:pointer" (click)="edit(movie)">✏️</a>
          ||
          <a style="cursor: pointer;" (click)="deleteMovie(movie.id)">❌</a>
        </li>
      </ul>

      <form [formGroup]="movieForm" (ngSubmit)="onSubmit()">
        <div style="margin-top: 10px">
          <h2>{{ vm.action }} Movie</h2>
          <input type="hidden" formControlName="id" />
          <div class="form-field">
            <label for="">Title</label>
            <input type="text" formControlName="title" />
          </div>

          <div class="form-field">
            <label for="">Year</label>
            <input type="text" formControlName="year" />
          </div>
          <div class="form-field">
            <button type="submit" [disabled]="movieForm.invalid" class="btn">
              💾 {{ vm.action }}
            </button>

            <button type="button" class="btn" (click)="cancel()">
              ❌ Cancel
            </button>
          </div>
        </div>
      </form>
    </ng-container>
  `,
  styles: [
    `
      li {
        list-style: none;
        font-size: 20px;
      }

      .form-field {
        margin-top: 10px;
        display: flex;
        gap: 10px;
        align-items: center;
      }

      .form-field input[type="text"] {
        font-size: 14px;
        padding: 3px 5px;
      }
    `,
  ],
})
export class MovieComponent {
  store = inject(MovieStore);
  fb = inject(FormBuilder);
  vm$ = this.store.vm$;
  movieForm: FormGroup = this.fb.group({
    id: [null],
    title: ["", Validators.required],
    year: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
  });

  onSubmit() {
    const movie: Movie = Object.assign(this.movieForm.value);
    if (!movie.id) {
      // add data
      movie.id = generateGuid();
      this.store.createMovie(movie);
    } else {
      //update data
      this.store.updateMovie(movie);
    }
    this.movieForm.reset();
  }

  edit(movie: Movie) {
    this.store.setAction("Update");
    this.movieForm.patchValue(movie);
  }

  cancel() {
    this.movieForm.reset();
    this.store.setAction("Add");
  }

  deleteMovie(id: string) {
    this.store.deleteMovie(id);
  }

  constructor() {
    this.store.loadMovies();
  }
}
