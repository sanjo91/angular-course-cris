import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alergen, Recipe } from '..';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.template.html',
  styleUrls: ['./recipes-edit.styles.scss'],
})
export class RecipesEditComponent implements OnInit {
  units = [];
  alergens: Alergen[] = [];
  id;
  recipe: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: RecipesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.units = this.service.getUnits();
    this.alergens = this.service.getAlergens();
    this.id = Number(this.activatedRoute.snapshot.params.id);
    this.service
      .getRecipe(this.id)
      .subscribe((recipe) => (this.recipe = recipe));
  }

  edit(r: Recipe) {
    this.service.addRecipe(r);
    this.router.navigate(['/recipes']);
  }
}
