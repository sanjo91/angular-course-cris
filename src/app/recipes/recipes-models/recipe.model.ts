export interface Ingredient {
  name: string;
  quantity?: number;
  unity: string;
  id: number;
}

export interface Alergen {
  id: string;
  name: string;
}

export interface Recipe {
  id?: number;
  name: string;
  ingredients: Ingredient[];
  steps: string;
  alergens: Alergen[];
  img?: File;
  isFav: boolean;
  comensales: number;
}
