import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../service/recipe.service';
import { PaginationService } from '../service/pagination.service';
import { IRecipe } from '../model/recipe';
import { ILevel } from '../model/Level';

@Component({
  selector: 'app-manage-recipe',
  templateUrl: './manage-recipe.component.html',
  styleUrls: ['./manage-recipe.component.css']
})
export class ManageRecipeComponent implements OnInit {


  @ViewChild('selectedValue', { static: true }) input: ElementRef;
 

  recipes: IRecipe[];

   //Pagination Variables

   pageField = [];
   exactPageList: any;
   paginationData: number;
   productsPerPage: any = 9;
   totalproducts: any;
   totalproductsCount: any = 0;
   pageNumber: boolean[] = [];
   selectedDate: string = "";
   pageSize: number = 9
   pageNo: number =1
   selectedLevel: any
   

  constructor(private _recipeService: RecipeService,
    private _router: Router,  public paginationService: PaginationService) { }

    levels: ILevel[] = [
      { id: 1, name: 'Easy' },
      { id: 2, name: 'Hard' },
      { id: 3, name: 'Moderate' }
    ];

    setDate(val:any){
       this.selectedDate = val.currentTarget.value;
       this.sortByDateChange()
    }

    sortByDateChange(){
     this._recipeService.getFilteredRecipe(this.selectedLevel,this.selectedDate).subscribe(
      (recipes: IRecipe[]) => this.recipes = recipes ),
      (err: any) => console.log(err)
     
    }

  ngOnInit() {
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
        this.getAllRecipes();   
    }
    getAllRecipes() {
         this._recipeService.getRecipes()
    .subscribe(
      (recipes: IRecipe[]) => this.recipes = recipes ),
      (err: any) => console.log(err)
}

editButtonClick(recipeId: number) {
  this._router.navigate(['/detail', recipeId]);
}


 //Method For Pagination
 totalNoOfPages() {
  this.paginationData = Number(this.totalproductsCount / this.productsPerPage);
  let tempPageData = this.paginationData.toFixed();
  if (Number(tempPageData) < this.paginationData) {
    this.exactPageList = Number(tempPageData) + 1;
    this.paginationService.exactPageList = this.exactPageList;
  } else {
    this.exactPageList = Number(tempPageData);
    this.paginationService.exactPageList = this.exactPageList
  }
  this.paginationService.pageOnLoad();
  this.pageField = this.paginationService.pageField;

}

 // To handle the page click
 showproductsByPageNumber(page, i) {
  this.recipes = [];
  this.pageNumber = [];
  this.pageNumber[i] = true;
  this.pageNo = page;
  this.getAllRecipesCount();
}

getAllRecipesCount() {
  this._recipeService.getAllRecipesCount().subscribe((data: any) => {
    this.totalproductsCount = data;
    this.pageSize = this.totalproductsCount ;
    this.exactPageList =  this.pageSize;
    this.totalNoOfPages();
  })
}
}
