import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Products } from '@app/_models/products/products';
import { Reviews } from '@app/_models/products/reviews/reviews';
import { Filter } from '@app/_models/filter/filter';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  null = null;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json', Accept : 'application/json'})
  };

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation' , result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.messages}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProducts(filterArray?: Filter) {
    let name; let brand; let category; let type; let min; let max; let sort ; let page; let hp; let tr;
    if (filterArray) {
      name = filterArray.name;
      brand = filterArray.brandArray;
      category = filterArray.categoryArray;
      type = filterArray.typeArray;
      min = filterArray.min;
      max = filterArray.max;
      sort = filterArray.sort;
      page  = filterArray.page;
      hp = filterArray.hp;
      tr = filterArray.tr;
    }
    const actualKeyword = name || ''; // The Search Keyword
    const actualbrand = brand || this.null; // Brand Array
    const actualCategory = category || this.null; // Category Array
    const actualType = type || this.null; // Type Array
    const actualMin = min || ''; // Minimum Value
    const actualMax = max || ''; // Maximum Value
    const actualSort = sort || 'asc'; // Sort by
    const actualHp = hp || ''; // Capacity / HorsePAWAAA
    const actualTr = tr || ''; // Capacity / TONS OF AIR
    const actualPage = page || `${environment.apiUrl}/api/items`;
    // The HttpParams
    let prodparams = new HttpParams()
      .set('name', actualKeyword)
      .set('min', actualMin)
      .set('max', actualMax)
      .set('sort', actualSort)
      .set('hp', actualHp.toString())
      .set('tr', actualTr.toString());
    if (actualbrand) {
      if (actualbrand.length !== 0) {
        // If actualBrandArray is not 0 loop else delete
        for (const bid of actualbrand) {
         prodparams = prodparams.set(`brand[${bid}]`, bid);
        }
      } else {
        for (const bid of actualbrand) {
          prodparams = prodparams.delete(`brand[${bid}]`);
         }
      }
    } else if (actualbrand == null) {
      // Delete the params if there is no array
        prodparams = prodparams.delete(`brand[]`);
    }

    if (actualCategory) {
      if (actualCategory.length !== 0) {
        // If actualCategoryArray is not 0 loop else delete
        for (const cid of actualCategory) {
          prodparams = prodparams.set(`category[${cid}]`, cid);
         }
      } else {
        for (const cid of actualCategory) {
          prodparams = prodparams.delete(`category[${cid}]`);
         }
      }
    } else if (actualCategory == null) {
      // Delete the params if there is no array
        prodparams = prodparams.delete(`category[]`);
    }

    if (actualType) {
      if (actualType.length !== 0) {
        // If actualCategoryArray is not 0 loop else delete
        for (const tid of actualType) {
          prodparams = prodparams.set(`type[${tid}]`, tid);
         }
      } else {
        for (const tid of actualType) {
          prodparams = prodparams.delete(`type[${tid}]`);
         }
      }
    } else if (actualType == null) {
      // Delete the params if there is no array
          prodparams = prodparams.delete(`type[]`);

    }
    console.log(prodparams.toString());
    return this.http.get<Products[]>(actualPage,
      { headers: this.httpOptions.headers, params: prodparams }).pipe(
          tap(_ => console.log('fetched products')),
          catchError(this.handleError<Products[]>('getProducts', []))
        );
  }

  getProductOption(option?: string) {
    return this.http.get<Products[]>(`${environment.apiUrl}/api/items/${option}`, this.httpOptions).pipe(
          tap(_ => console.log('fetched products Options')),
          catchError(this.handleError<Products[]>('getProducts', []))
        );
  }

  getProduct(slug: string): Observable<Products> {
    // Get Single Product
    return this.http.get<Products>(`${environment.apiUrl}/api/items/${slug}`, this.httpOptions ).pipe(
      tap(_ => console.log('fetched product'))
      );
  }

  getProductReviews(slug: string, page?: string): Observable<Reviews> {
    const actualPage = page || `${environment.apiUrl}/api/items/reviews/${slug}`;
    return this.http.get<Reviews>(actualPage, this.httpOptions ).pipe(
      tap(_ => console.log('fetched reviews'))
    );
  }
}
