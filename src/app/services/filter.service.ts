import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  filter(
    array: any[],
    field: any | string | number,
    match = 'c',
    allFields = true
  ) {
    // debugger;
    if (typeof field == 'object') {
      let properties = Object.getOwnPropertyNames(field);
      let propertiesWithValue = properties.filter((e: any) => {
        if (field[e] != undefined && field[e] != null && field[e] != '') {
          return e;
        }
      });

      return array.filter((e) => {
        let contains = 0;
        propertiesWithValue.forEach((property) => {
          if (e[property]) {
            if (Array.isArray(e[property])) {
              let ret: any = this.filter(e[property], field[property], match);
              if (ret.length > 0) {
                contains++;
              }
            } else {
              if (match == 'c') {
                if (
                  e[property]
                    .toLowerCase()
                    .includes(field[property].toLowerCase())
                ) {
                  contains++;
                }
              } else {
                if (
                  e[property]
                    .toLowerCase()
                    .indexOf(field[property].toLowerCase()) == 0
                ) {
                  contains++;
                }
              }
            }
          } else {
            //throw (`Filter error Propriedade ${property} não especificada`);
          }
        });

        if (allFields) {
          return contains == propertiesWithValue.length ? e : null;
        } else {
          return contains > 0 || propertiesWithValue.length == 0 ? e : null;
        }
      });
    }
    return [];
  }
}
