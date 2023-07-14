import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function customRenavamValidator(length: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value.length <= length) {
            return null;
        }else{
            return { error: true }
        }
    }
}