import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap, catchError, map } from "rxjs/operators";

import { environment } from '@environments/environment';
import { Products } from '@app/_models/products/products';
import { Filter } from '@app/_models/filter/filter';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  null = null;
  filter = new Filter;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  };

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation' , result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.messages}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }

  getProducts(filterArray: Filter) {
    let actualKeyword = filterArray.name || ''; // The Search Keyword
    let actualbrand = filterArray.brandArray || this.null; // Brand Array
    let actualCategory = filterArray.categoryArray || this.null;// Category Array
    let actualType = filterArray.typeArray || this.null;// Type Array
    let actualMin = filterArray.min || ''; //Minimum Value
    let actualMax = filterArray.max || ''; //Maximum Value
    let actualSort = filterArray.sort || 'asc'; //Sort by
    let actualPage = filterArray.page || `${environment.apiUrl}/api/items`;
    // //The HttpParams
    let prodparams = new HttpParams()
      .set('name', actualKeyword)
      .set('min',actualMin)
      .set('max', actualMax)
      .set('sort', actualSort);
    if(actualbrand){
      if(actualbrand.length !== 0){
        //If actualBrandArray is not 0 loop else delete
        for(let bid of actualbrand){
         prodparams = prodparams.set(`brand[${bid}]`, bid);
        }
      }else {
        for(let bid of actualbrand){
          prodparams = prodparams.delete(`brand[${bid}]`);
         }
      }
    }else if(actualbrand == null){
      //Delete the params if there is no array
        prodparams = prodparams.delete(`brand[]`);
    }

    if(actualCategory){
      if(actualCategory.length !== 0){
        //If actualCategoryArray is not 0 loop else delete
        for(let cid of actualCategory){
          prodparams = prodparams.set(`category[${cid}]`, cid);
         }
      }else{
        for(let cid of actualCategory){
          prodparams = prodparams.delete(`category[${cid}]`);
         }
      }
    }else if(actualCategory == null){
      //Delete the params if there is no array
        prodparams = prodparams.delete(`category[]`);
    }

    if(actualType){
      if(actualType.length !== 0){
        //If actualCategoryArray is not 0 loop else delete
        for(let tid of actualType){
          prodparams = prodparams.set(`type[${tid}]`, tid);
         }
      }else{
        for(let tid of actualType){
          prodparams = prodparams.delete(`type[${tid}]`);
         }
      }
    }else if(actualType == null){
      //Delete the params if there is no array
          prodparams = prodparams.delete(`type[]`);

    }
    console.log(prodparams.toString());
    return this.http.get<Products[]>(actualPage,
      { params: prodparams }).pipe(
          tap(_ => console.log('fetched products')),
          catchError(this.handleError<Products[]>('getProducts', []))
        );
  }
  getProduct(slug: string): Observable<Products> {
    //Get Single Product
    return this.http.get<Products>(`${environment.apiUrl}/api/items/${slug}`).pipe(
      tap(_ => console.log('fetched product'))
      );
  }
}
