import { IIngredient } from "./Ingredient";
import { IStep } from "./step";
import { IImage } from "./image";

 export interface IRecipe{
    Id: number,
    Title: string,
    Level: string,
     Ingredients: IIngredient[], 
     Steps: IStep[], 
     Images: IImage[], 
     CreatedDate: string
}




