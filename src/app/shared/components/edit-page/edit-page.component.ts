import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { EditPageControl } from './extensions/edit.page.control.interface';
import { debounceTime, finalize, Subscription } from 'rxjs';

@Component({
  selector: 'edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {


  @Input() model: any;
  @Input() labels: string[] = [];
  @Input() form: FormGroup = new FormGroup({});

  @Output() submit: EventEmitter<any> = new EventEmitter();

  controls: EditPageControl[] = [];

  constructor(
    private _fb: FormBuilder
  ) {
    
  }

  ngOnInit() {
    const entries: [string, any][] = Object.entries(this.model);

    for (let i = 0; i < entries.length; i++) {
      this.controls.push({
        controlType: entries[i][1].controlType,
        label: entries[i][1].label,
        name: entries[i][0],
        mask: entries[i][1].mask,
        selectOptions: entries[i][1].selectOptions,
        required: entries[i][1].required,
        disabled: entries[i][1].disabled,
        id: entries[i][1].id,
        blurred: entries[i][1].blurred,
        onChange: entries[i][1].onChange,
        value: entries[i][1].value
      });
    }
    
    this.createControls();
  }

  createControls() {
    for (let control of this.controls) {
      this.form.addControl(control.name!, this.createControl(control.required === true ? [Validators.required] : []));

      if (control.onChange) {
        const _sub: Subscription = this.form.get(control.name!)!.valueChanges
          .pipe(debounceTime(1500), finalize(() => _sub.unsubscribe()))
          .subscribe(change => {
            control.onChange!(change);
          });
      }
    }
  }

  createControl(validators?: ValidatorFn[]): FormControl {
    return this._fb.control('', {
      validators
    });
  }

  submitted() {
    this.submit.emit(this.form);
  }
}
