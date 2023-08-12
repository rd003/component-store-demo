import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-movie",
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule],
  template: `
    <p>Movie works</p>
    <h2>Movies</h2>

    <ng-container>
      <div style="margin:8px 0px">
        <ngx-spinner type="ball-scale-multiple"></ngx-spinner>
      </div>
      <div style="margin:8px 0px">Something went wrong</div>
      <ul>
        <li>
          👉 Movie-title (year) ||
          <a style="cursor:pointer">✏️</a>
          ||
          <a style="cursor: pointer;">❌</a>
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

            <button type="button" class="btn">❌ Cancel</button>
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

      .btn {
        border: 1px solid;
        font-size: 16px;
        cursor: pointer;
        padding: 3px 5px;
      }
    `,
  ],
})
export class MovieComponent implements OnInit {
  // movieForm: FormGroup = this.fb.group({
  //   id: [null],
  //   title: ["", Validators.required],
  //   year: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
  // });
  spinner = inject(NgxSpinnerService);

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }
}
