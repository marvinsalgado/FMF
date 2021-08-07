import { Injectable } from '@angular/core';
import {Nacionalidades} from '../../models/nacionalidades';
import {nacionalidades} from '../../data/nacionalidades';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadesServiceService {
  nacionalidad: Array<Nacionalidades> = (nacionalidades);

  constructor() { }

  get() {
    return this.nacionalidad;
  }
}
