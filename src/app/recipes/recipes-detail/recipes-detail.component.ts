import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipes-models';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.template.html',
  styleUrls: ['./recipes-detail.styles.scss'],
})
export class RecipesDetailComponent implements OnInit {
  public recipe: Recipe;
  public id;

  constructor(
    private service: RecipesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.params.id);
    this.service.getRecipe(this.id).subscribe((r) => (this.recipe = r));
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

  back() {
    this.router.navigate(['/recipes']);
  }
}
