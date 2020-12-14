import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-textarea',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss']
})
export class InputAreaComponent
{
  @Input() titulo: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  constructor(public validacao: ValidarCamposService)
  {

  }

  get formControl(): AbstractControl
  {
    return this.formGroup.controls[this.controlName];
  }
}
