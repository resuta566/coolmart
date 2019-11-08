import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap, catchError, map } from "rxjs/operators";

import { environment } from '@environments/environment';
import { Products } from '@app/_models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  null = null;
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

  getProducts(keyword?, brand?, category?, type?, min?, max?) {
    let actualKeyword = keyword ? keyword : '';
    let actualbrand = brand ? brand : this.null;
    let actualCategory = category ? category : this.null;
    let actualType = type ? type : this.null;
    let actualMin = min ? min : '';
    let actualMax = max ? max : '';
    //The HttpParams
    let prodparams = new HttpParams().set('name', actualKeyword).set('min',actualMin).set('max', actualMax);
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
    return this.http.get<Products[]>(`${environment.apiUrl}/api/items`,
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
