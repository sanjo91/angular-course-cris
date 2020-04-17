import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  RecipesDetailComponent,
  RecipesEditComponent,
  RecipesFormComponent,
  RecipesMainComponent,
  RecipesNewComponent,
} from './recipes';

const appRoutes: Routes = [
  {
    path: 'recipes',
    component: RecipesMainComponent,
  },
  {
    path: 'recipes/new',
    component: RecipesNewComponent,
  },
  {
    path: 'recipes/edit/:id',
    component: RecipesEditComponent,
  },
  {
    path: 'recipes/detail/:id',
    component: RecipesDetailComponent,
  },
  {
    path: '**',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    RecipesMainComponent,
    RecipesEditComponent,
    RecipesNewComponent,
    RecipesDetailComponent,
    RecipesFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
