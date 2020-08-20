import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IRecipe } from '../model/recipe';
import { RecipeService } from '../service/recipe.service';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: IRecipe;
  constructor(private _recipeService: RecipeService,
    private route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const Id = +params.get('id');
      if (Id) {
        this.getRecipe(Id);
      }
    });
  }

  getRecipe(id: number) {
    this._recipeService.getRecipe(id)
      .subscribe((recipe: IRecipe) => this.recipe),
      (err: any) => console.log(err);
  };
  

  editButtonClick(recipe: IRecipe, flag: string) {
    if (flag === 'edit') {
      this._router.navigate(['/edit', recipe.Id]);
    }
    else if (flag === 'save') {

    } else if (flag === "pdf") {
      this.savePdf(recipe);
    }


  }
  savePdf(recipe: IRecipe): void {
    var doc = new jsPDF();
    var col = ["Title", "Images"];
   
    this._recipeService.getRecipes()
      .subscribe((recipe: IRecipe[]) => { 
        doc.autoTable(col, recipe);
         doc.save('Test.pdf');
        }),
      (err: any) => console.log(err);

  }
}






