import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Alergen, Ingredient, Recipe } from '../recipes-models';

@Component({
  selector: 'app-recipes-form',
  templateUrl: './recipes-form.template.html',
  styleUrls: ['./recipes-form.styles.scss'],
})
export class RecipesFormComponent implements OnInit {
  @Input() units = [];
  @Input() alergens: Alergen[] = [];
  @Input() recipe: Recipe;

  @Output() handlerSend = new EventEmitter<Recipe>();

  public formGroup: FormGroup;
  public recipeAlergens: Alergen[] = [];

  private selectedAlergens: Alergen[] = [];
  private ingridients: Ingredient[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: [this.recipe ? this.recipe.name : '', Validators.required],
      comensales: [
        this.recipe ? this.recipe.comensales : 4,
        Validators.required,
      ],
      alergen: ['-1'],
      steps: [this.recipe ? this.recipe.steps : '', Validators.required],
      new_ingridient_name: [''],
      new_ingridient_quantity: [''],
      new_ingridient_unit: ['gramos'],
    });

    if (this.recipe) {
      this.ingridients = this.recipe.ingredients;
      this.generateInputs();
    }

    this.recipeAlergens = this.recipe ? this.recipe.alergens : [];
    this.selectedAlergens = this.recipeAlergens;
  }

  generateInputs() {
    this.ingridients.forEach((a) => {
      this.formGroup.addControl(
        `ingridient_${a.id}_name`,
        new FormControl(a.name, Validators.required)
      );
      this.formGroup.addControl(
        `ingridient_${a.id}_quantity`,
        new FormControl(a.quantity)
      );
      this.formGroup.addControl(
        `ingridient_${a.id}_unity`,
        new FormControl(a.unity, Validators.required)
      );
    });
  }

  getIngridients(): Ingredient[] {
    return this.ingridients;
  }

  getSelectedAlergens() {
    return this.selectedAlergens.map((a) => a.name).join(', ');
  }

  getAlergens() {
    return this.alergens.filter(
      (a) => !this.selectedAlergens.some((sa) => sa.id === a.id)
    );
  }

  send() {
    if (!this.formGroup.valid || !this.ingridients.length) {
      return;
    }

    const recipe: Recipe = {
      isFav: this.recipe ? this.recipe.isFav : false,
      name: this.formGroup.get('name').value,
      comensales: this.formGroup.get('comensales').value,
      steps: this.formGroup.get('steps').value,
      ingredients: this.ingridients,
      alergens: this.selectedAlergens,
    };

    this.handlerSend.emit(recipe);
  }

  addIngridient() {
    const name = this.formGroup.get('new_ingridient_name').value;
    const quantity = this.formGroup.get('new_ingridient_quantity').value;
    const unity = this.formGroup.get('new_ingridient_unit').value;
    const id = Math.max(0, ...this.ingridients.map((i) => i.id));
    if (name && unity) {
      const i: Ingredient = {
        name,
        unity,
        id: id + 1,
        quantity,
      };
      this.ingridients.push(i);
      this.generateInputs();
    }
  }

  removeIngridient(id: number) {
    this.ingridients = this.ingridients.filter((i) => i.id !== id);
    this.generateInputs();
  }

  addAlergen() {
    const alergenId = this.formGroup.get('alergen').value;
    if (alergenId && alergenId !== '-1') {
      this.selectedAlergens.push(this.alergens.find((a) => a.id === alergenId));
    }
  }
}
