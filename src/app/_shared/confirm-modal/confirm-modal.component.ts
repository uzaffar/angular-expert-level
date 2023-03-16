import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonActions} from "../models/button.actions";

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  @Input() content: string = 'Provide your content';
  @Input() htmlContent: string = '';

  //You could also create a much more complex interface and pass that into that array.
  @Input() buttons: ButtonActions[] = [];

  @Output() buttonClicked = new EventEmitter<string>();

  action = (button: string) => this.buttonClicked.emit(button)

}

