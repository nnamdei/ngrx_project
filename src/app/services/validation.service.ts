import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  // constructor() { }
  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  userIdValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateUserName(userControl.value)) {
          resolve({
            userNameNotAvailable: true
          });
        } else {
          resolve(null);
        }
      }, 1200);
    });
  }

  validateUserName(userName: string) {
    const Userlist = ['john', 'helen', 'usr003', 'owner'];
    return (Userlist.indexOf(userName) > -1);
  }

  validateAmount(userControl: AbstractControl) {
    if (userControl.value < 0 || userControl.value === 0) {
      return ({ amountIsInvalid: true });
    }
  }
}
