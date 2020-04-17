import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  heroes = [
    { id: 11, name: 'Dr Nice', birthdate: '1990-04-20T13:00:18+00:00' },
    { id: 12, name: 'Narco', birthdate: '1985-09-10T13:00:00+00:00' },
    { id: 13, name: 'Bombasto', birthdate: '1998-06-20T13:00:00+00:00' },
    { id: 14, name: 'Celeritas', birthdate: '1994-08-25T13:00:00+00:00' },
    { id: 15, name: 'Magneta', birthdate: '2030-04-08T18:00:00+00:00' },
    { id: 16, name: 'RubberMan', birthdate: '2000-07-14T13:00:00+00:00' },
    { id: 17, name: 'Dynama', birthdate: '2020-03-14T13:00:00+00:00' },
    { id: 18, name: 'Dr IQ', birthdate: '1991-10-12T11:00:00+00:00' },
    { id: 19, name: 'Magma', birthdate: '1988-03-14T13:00:00+00:00' },
    { id: 20, name: 'Tornado', birthdate: '1970-01-17T13:00:00+00:00' },
  ];

  favHero: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  getAll() {
    return this.heroes;
  }

  getOne(id) {
    return this.heroes.find((hero) => hero.id === id);
  }

  setHero(hero) {
    this.heroes.push(hero);
  }

  getHeroFav(): Observable<any> {
    return this.favHero;
  }

  setHeroFav(hero) {
    this.favHero.next(hero);
  }

  getTiempo(): Observable<any> {
    return this.http.get('https://openweathermap.org/data/2.5/weather', {
      params: {
        q: 'valladolid',
        appid: '439d4b804bc8187953eb36d2a8c26a02',
      },
    });
  }
}
