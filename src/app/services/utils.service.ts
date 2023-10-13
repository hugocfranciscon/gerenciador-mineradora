import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  formValid(form: FormGroup): void {
    for (let i in form.controls) {
      if (form.controls[i].status == 'INVALID') {
        let stringRegex = i.replace(
          /([a-z]+)([A-Z][a-z]*)?([A-Z][a-z]*)?([A-Z][a-z]*)?([A-Z][a-z]*)?([A-Z][a-z]*)?([A-Z][a-z]*)?([A-Z][a-z]*)?/,
          '$1 $2 $3 $4 $5 $6 $7 $8'
        );
        let stringFormatted =
          stringRegex[0].toUpperCase() + stringRegex.slice(1);

        let arrayText = stringFormatted.split(' ');
        for (let i in arrayText) {
          let regexAO = /ao$/gi;
          let regexCAO = /cao$/gi;
          if (regexAO.test(arrayText[i])) {
            if (regexCAO.test(arrayText[i])) {
              arrayText[i] = arrayText[i].replace(regexCAO, 'ção');
            } else {
              arrayText[i] = arrayText[i].replace(regexAO, 'ão');
            }
          }
        }
        stringFormatted = arrayText.join(' ');

        alert('Favor informar o campo ' + stringFormatted + '.');
        document.getElementById(i)?.focus();
        break;
      }
    }
  }
}
