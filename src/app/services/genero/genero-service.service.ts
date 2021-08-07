import { Injectable } from '@angular/core';
import {Genero} from '../../models/genero';
import {generos} from '../../data/generos';


@Injectable({
  providedIn: 'root'
})
export class GeneroServiceService {
  genero: Array<Genero> = (generos);

  constructor() { }

  get() {
    return this.genero;
  }
}
