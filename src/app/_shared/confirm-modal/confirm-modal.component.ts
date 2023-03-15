import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  @Input() content: string = 'Provide your content';

  //You could also create a much more complex interface and pass that into that array.
  @Input() buttons: string[] = ['Cancel', 'Save'];

  @Output() buttonClicked = new EventEmitter<string>();

  action = (button: string) => this.buttonClicked.emit(button)

}

