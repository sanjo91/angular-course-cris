import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alergen, Recipe } from '../recipes-models';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-new',
  templateUrl: './recipes-new.template.html',
  styleUrls: ['./recipes-new.styles.scss'],
})
export class RecipesNewComponent implements OnInit {
  units = [];
  alergens: Alergen[] = [];

  constructor(private service: RecipesService, private router: Router) {}

  ngOnInit() {
    this.units = this.service.getUnits();
    this.alergens = this.service.getAlergens();
  }

  create(r: Recipe) {
    this.service.addRecipe(r);
    this.router.navigate(['/recipes']);
  }
}
