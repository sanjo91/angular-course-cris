import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipes-models';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-main',
  templateUrl: './recipes-main.template.html',
  styleUrls: ['./recipes-main.styles.scss'],
})
export class RecipesMainComponent implements OnInit {
  public recipes: Recipe[] = [];
  public favRecipes: Recipe[] = [];

  constructor(private router: Router, private service: RecipesService) {}

  ngOnInit() {
    this.service.getAll().subscribe((res) => (this.recipes = res));
    this.service.getFavs().subscribe((res) => (this.favRecipes = res));
  }

  public getIngredients(r: Recipe): string {
    return r.ingredients
      .map((i) => {
        return `${i.name} - ${i.quantity || ''}${i.unity}`;
      })
      .join(',');
  }

  public getAlergens(r: Recipe): string {
    return r.alergens.map((a) => a.name).join(', ');
  }

  edit(r: Recipe) {
    this.router.navigate(['recipes/edit', r.id]);
  }
  detail(r: Recipe) {
    this.router.navigate(['recipes/detail', r.id]);
  }

  toggle(r: Recipe) {
    this.service.toggleFav(r);
  }
}
