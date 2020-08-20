

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// // import { SearchData } from '../pagination/searchdata';

// @Injectable({
//   providedIn: 'root'
// })
// export class RecipeService {
//     private url = "";

//     constructor(public http: HttpClient) {
//     }  

// getAllProducts(pageNo,pageSize,sortOrder): Observable<any> {
//     this.url = 'https://localhost:44362/api/product?pageNo=' + pageNo+'&pageSize='+pageSize+'&sortOrder='+sortOrder;
//     return this.http.get(this.url);
//   }

//   getFilteredProducts(searchText: string,fromDate:any,toDate:any,priceFrom:string,priceTo:string,pageNo:any,pageSize:any): Observable<any> {
//     this.url = 'https://localhost:44362/api/Product';
//     return this.http.post(this.url,{searchText,fromDate,toDate,priceFrom,priceTo,pageNo,pageSize});
//   }

//   getSearchedProducts(searchText: string,pageNo:any,pageSize:any): Observable<any> {
//     this.url = 'https://localhost:44362/api/Search/find?query=' + searchText+'&page='+pageNo+'&pageSize='+pageSize;
//     return this.http.get(this.url);
//   }

//   getProductsForExport(): Observable<any> {
//     this.url = 'https://localhost:44362/api/Product/exportData';
//     return this.http.get(this.url);
//   }

//   getAllProductsCount(): Observable<any> {
//     this.url = 'https://localhost:44362/api/product/getProductCount';
//     return this.http.get(this.url);
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRecipe } from '../model/recipe';

@Injectable()
export class RecipeService {
    baseUrl = 'https://localhost:44331/api';
    constructor(private httpClient: HttpClient) {
    }

    getRecipes(): Observable<IRecipe[]> {
        return this.httpClient.get<IRecipe[]>(this.baseUrl+'/recipe')
            .pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client Side Error :', errorResponse.error.message);
        } else {
            console.error('Server Side Error :', errorResponse);
        }
        return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
    }

    getRecipe(id: number): Observable<IRecipe> {
        return this.httpClient.get<IRecipe>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }

    getFilteredRecipe(level: string, date: string): Observable<IRecipe[]> {
        return this.httpClient.get<IRecipe[]>(`${this.baseUrl}+'/GetFilteredRecipes?'+${level}&${date}`)
            .pipe(catchError(this.handleError));
    }

    addRecipe(recipe: IRecipe): Observable<IRecipe> {
        return this.httpClient.post<IRecipe>(this.baseUrl+'/AddRecipe', recipe, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
        .pipe(catchError(this.handleError));
    }
    getAllRecipesCount(): Observable<any> {
        return this.httpClient.get<IRecipe>(this.baseUrl+'/getRecipeCount')
            .pipe(catchError(this.handleError));
      }

    updateRecipe(recipe: IRecipe): Observable<void> {
        return this.httpClient.put<void>(`${this.baseUrl}/UpdateRecipe`, recipe, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(catchError(this.handleError));
    }

    deleteRecipe(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }
}
