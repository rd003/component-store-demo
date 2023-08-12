import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-movie",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Movies</h2>
    <ng-container *ngIf="true">
      <div style="margin:8px 0px" *ngIf="true">loading....</div>
      <div style="margin:8px 0px" *ngIf="true">Something went wrong</div>
      <ul *ngIf="true">
        <li *ngFor="let movie of [1, 2, 3, 4]">
          👉 Movie-title (year) ||
          <a style="cursor:pointer" (click)="({})">✏️</a>
          ||
          <a style="cursor: pointer;" (click)="({})">❌</a>
        </li>
      </ul>

      <form>
        <div style="margin-top: 10px">
          <h2>Add Movie</h2>
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
            <button type="submit" class="btn">💾 Add</button>

            <button type="button" class="btn" (click)="({})">❌ Cancel</button>
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
  // movieForm: FormGroup = this.fb.group({
  //   id: [null],
  //   title: ["", Validators.required],
  //   year: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
  // });
}
