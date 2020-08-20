import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder,ReactiveFormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../service/recipe.service';
import { IRecipe } from '../model/recipe';
import { IStep } from '../model/step';
import { IIngredient } from '../model/Ingredient';
import { IImage } from '../model/image';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  recipeForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute , private _router: Router
    ,private _recipeService: RecipeService,) { }

  formErrors = {
    'title': '',
    'level': '',
    'stepName': '',
    'details': '',
    'imgName': '',
    'imgUrl': '',
    'ingName': '',
    'quantity': ''
   
  };
// This object contains all the validation messages for this form
validationMessages = {
  'title': {
    'required': 'Title is required.',
    'minlength': 'Title must be greater than 10 characters.',
    'maxlength': 'Title must be less than 100 characters.'
  },
  'level': {
    'required': 'Level is required.'
  },
  'stepName': {
    'required': 'Step Name is required.',
  },
  'details': {
    'required': 'Step Description is required.',
  },
  'imgName': {
    'required': 'Image Name is required.',
  },
  'imgUrl': {
    'required': 'Image Url is required.',
  },
  'ingName': {
    'required': 'Ingredient Name is required.',
  },
  'quantity': {
    'required': 'Ingredient Quantity is required.',
  },
};

id: number = 0;

ngOnInit() {
  debugger;
  // Modify the code to include required validators on
  // all form controls
  this.recipeForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    level: ['', Validators.required],
    images: this.fb.array([
      this.addImageFormGroup(),
    ]),
    steps: this.fb.array([
     this.addstepsFormGroup()
    ]),
    ingredient: this.fb.array([
     this.addingredientFormGroup()
    ]),
  });

  this.route.paramMap.subscribe(params => {
    const Id = +params.get('id');
    if (Id) {
      this.getRecipe(Id);
    }
  });
}

getRecipe(id: number) {
  this._recipeService.getRecipe(id)
    .subscribe((recipe: IRecipe) =>{ 
      this.setValuesWhileEdit(recipe);
    }),
    (err: any) => console.log(err);
};

setValuesWhileEdit(rec: IRecipe): void{
    this.recipeForm.patchValue({
      title: rec.Title,
      level: rec.Level,
    });

    this.recipeForm.setControl('steps',this.setExistingSteps(rec.Steps));
    this.recipeForm.setControl('ingredient',this.setExistingIngredient(rec.Ingredients));
    this.recipeForm.setControl('images',this.setExistingImages(rec.Images));
}

setExistingSteps(steps:IStep[]) : FormArray {
  const formArray = new FormArray([]);
  steps.forEach(s=>
    {
      formArray.push( this.fb.group({
          Name: s.Name,
          id: s.id,
          Details: s.Details
        }));
    });
    return formArray;
  
}

setExistingIngredient(ing:IIngredient[]) : FormArray {
  const formArray = new FormArray([]);
  ing.forEach(s=>
    {
      formArray.push( this.fb.group({
          Name: s.Name,
          id: s.id,
          Quantity: s.Quantity
        }));
    });
    return formArray;
}

setExistingImages(img:IImage[]) : FormArray {
  const formArray = new FormArray([]);
  img.forEach(s=>
    {
      formArray.push( this.fb.group({
          Name: s.Name,
          id: s.id,
          Url: s.Url
        }));
    });
    return formArray;
}

getControls(opt: string) {
  return (this.recipeForm.get(opt) as FormArray).controls;
}


addSteps(): void {
  (<FormArray>this.recipeForm.get('steps')).push(this.addstepsFormGroup());
}

addIngredient(): void {
  (<FormArray>this.recipeForm.get('ingredient')).push(this.addingredientFormGroup());
}

removeSteps(stepIndexId: number): void{
  (<FormArray>this.recipeForm.get('steps')).removeAt(stepIndexId);
}

removeIngredient(ingredientIndexId: number): void{
  (<FormArray>this.recipeForm.get('ingredient')).removeAt(ingredientIndexId);
}

addImage(): void {
  for(let i=0;i<3;i++){
   (<FormArray>this.recipeForm.get('ingredient')).push(this.addingredientFormGroup());
  }
}

recipe: IRecipe

onSubmit(){

  this.recipe.Title = this.recipeForm.value.title;
  this.recipe.Level = this.recipeForm.value.level;
  this.recipe.Ingredients = this.recipeForm.value.Ingredient;
  this.recipe.Images = this.recipeForm.value.images;
  this.recipe.Steps = this.recipeForm.value.step;

  if( this.recipeForm.value.id !== 0){
    this.updateRecipes();
  }
  else{
      this.addRecipes();
  }
  
}
addRecipes():void{
  
 
  this._recipeService.addRecipe(this.recipe).subscribe(() =>{ 
    this._router.navigate(['home']);
  }),
  (err: any) => console.log(err);
}

updateRecipes():void{
  this.recipe.Id = this.recipeForm.value.id;
  this._recipeService.updateRecipe(this.recipe).subscribe(() =>{ 
    this._router.navigate(['home']);
  }),
  (err: any) => console.log(err);
}


addImageFormGroup(): FormGroup {

  return this.fb.group({
    imgName:['', Validators.required],
    imgUrl: ['', Validators.required]
  });
}

addstepsFormGroup(): FormGroup {
  return this.fb.group({
      stepName: ['', Validators.required],
      details: ['', Validators.required],
  });
}

addingredientFormGroup(): FormGroup {
  return this.fb.group({
    ingName: ['', Validators.required],
      quantity: ['', Validators.required],
  });
}




logValidationErrors(group: FormGroup): void {
  // Loop through each control key in the FormGroup
  Object.keys(group.controls).forEach((key: string) => {
    // Get the control. The control can be a nested form group
    const abstractControl = group.get(key);
    // If the control is nested form group, recursively call
    // this same method
    if (abstractControl instanceof FormGroup) {
      this.logValidationErrors(abstractControl);
      // If the control is a FormControl
    } else {
      // Clear the existing validation errors
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid) {
        // Get all the validation messages of the form control
        // that has failed the validation
        const messages = this.validationMessages[key];
        // Find which validation has failed. For example required,
        // minlength or maxlength. Store that error message in the
        // formErrors object. The UI will bind to this object to
        // display the validation errors
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }

        if (abstractControl instanceof FormArray) {
          for (const control of abstractControl.controls) {
            if (control instanceof FormGroup) {
              this.logValidationErrors(control);
            }
          }
        }
      }
    }
  });
  
}

}
