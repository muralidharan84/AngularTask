import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageRecipeComponent,
    CreateRecipeComponent,
    RecipeDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
