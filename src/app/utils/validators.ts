import { AbstractControl } from '@angular/forms';
export class MyValidators {
    static validPassword(control: AbstractControl) {
        const value = control.value;
        if (!containsNumber(value)) {
            return { invalid_password: true };
        }
        return null;
    }

    //Método estatico para hace match con el password:
    static matchPassword(control: AbstractControl) {
        const password = control.get('password')!.value;
        const confirmPassword = control.get('confirmPassword')!.value;

        if (password === confirmPassword) {
            //si no hay errores, coinciden y no es necesario realizar nada
            return null
        } else {
            return { match_password_invalid: true };
        }
    }
}
function containsNumber(value: string) {
    return value.split('').find(v => isNumber(v)) !== undefined;
}
function isNumber(value: string) {
    return !isNaN(parseInt(value, 10));
}