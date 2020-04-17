import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Alergen, Recipe } from './recipes-models';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipes: Recipe[] = [
    {
      id: 1,
      comensales: 4,
      name: 'macarrones',
      ingredients: [
        {
          name: 'macarrones',
          unity: 'gramos',
          quantity: 100,
          id: 1,
        },
      ],
      isFav: false,
      steps: 'no tiene perdida',
      alergens: [
        {
          id: '1',
          name: 'gluten',
        },
      ],
    },
  ];

  alergenos: Alergen[] = [
    {
      id: '1',
      name: 'gluten',
    },
    {
      id: '2',
      name: 'leche',
    },
    {
      id: '3',
      name: 'nueces',
    },
  ];

  units = ['gramos', 'litros'];

  recipes$ = new BehaviorSubject<Recipe[]>(this.recipes);
  favsRecipes$ = new BehaviorSubject<Recipe[]>(
    this.recipes.filter((r) => r.isFav)
  );

  getAll() {
    return this.recipes$;
  }

  getFavs() {
    return this.favsRecipes$;
  }

  getAlergens() {
    return this.alergenos;
  }

  getUnits() {
    return this.units;
  }

  addRecipe(re: Recipe) {
    re.id = Math.max(0, ...this.recipes.map((r) => r.id)) + 1;
    this.recipes.push(re);
    this.recipes$.next(this.recipes);
    this.favsRecipes$.next(this.recipes.filter((r) => r.isFav));
  }

  removeRecipe(id: number) {
    this.recipes = this.recipes.filter((r) => r.id !== id);
    this.recipes$.next(this.recipes);
    this.favsRecipes$.next(this.recipes.filter((r) => r.isFav));
  }

  getRecipe(id: number): Observable<Recipe> {
    return of(this.recipes.find((r) => r.id === id));
  }

  toggleFav(r: Recipe) {
    this.recipes = this.recipes.map((re) => {
      let isFav = re.isFav;
      if (r.id === re.id) {
        isFav = !isFav;
      }
      return {
        ...re,
        isFav,
      };
    });
    this.recipes$.next(this.recipes);
    this.favsRecipes$.next(this.recipes.filter((r) => r.isFav));
  }
}
