import { Injectable } from '@angular/core';
import {Clubes} from '../../models/clubes';
import {club} from '../../data/clubes';

@Injectable({
  providedIn: 'root'
})
export class ClubesServiceService {
  clubes: Array<Clubes> = (club);


  constructor() { }

  get() {
    return this.clubes;
  }
}
