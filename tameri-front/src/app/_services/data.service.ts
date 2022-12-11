import { Injectable } from '@angular/core';
import { uniqueSort } from 'jquery';
import { Unit } from '../_models/unit.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  static units = [
    new Unit('g', 'gramme', Unit.MASSE),
    new Unit('Kg', 'Kilogramme', Unit.MASSE),
    new Unit('L', 'Liter', Unit.VOLUME),
    new Unit('m', 'meter', Unit.DISTANCE),
    new Unit('Km', 'kilometer', Unit.DISTANCE),
  ]

  constructor() { }

  static getUnit(symbole: string) {
    let unit = new Unit('', '', 0);
    DataService.units.forEach((u) => {
      if (u.symbole === symbole) {
        unit = u;
      }
    });
    return unit;
  }
}
