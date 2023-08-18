import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() type: string = 'text';
  @Input() control!: FormControl;
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() tabindex: number=1;

  showErrors() {
    return this.control?.touched && this.control?.dirty && this.control?.errors;
  }
}
