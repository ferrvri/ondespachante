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


  @Input() controls: EditPageControl[] = [];
  @Input() labels: string[] = [];
  @Input() form: FormGroup = new FormGroup({});

  @Output() submit: EventEmitter<any> = new EventEmitter();


  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
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
