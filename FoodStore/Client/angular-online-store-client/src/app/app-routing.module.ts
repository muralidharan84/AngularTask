import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const routes: Routes = [ 
  { path: 'Home', component:  ManageRecipeComponent },
  { path: 'Create', component: CreateRecipeComponent },
  { path: 'Detail/:id', component: RecipeDetailComponent },
  { path: '',   redirectTo: '/Home', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
