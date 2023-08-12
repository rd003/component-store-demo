import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      person works!
    </p>
  `,
  styles: [
  ]
})
export class PersonComponent {

}
