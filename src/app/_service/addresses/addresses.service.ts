import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, tap, map } from "rxjs/operators";
import { Address } from '@app/_models/address/address';
import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
import { environment } from '@environments/environment';
import { AuthenticationService } from '../core/authentication.service';
import { Router } from '@angular/router';

const ADDRESS_API = environment.addressApiUrl;
@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router
    ) { }

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
    };


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
    oneUserAddress(addressId: number){
      let currentUser = this.authenticationService.currentUserValue;
      if(currentUser){
        return this.http.get<Address>(`${environment.apiUrl}/api/user-address/${addressId}/edit`,this.httpOptions)
                .pipe(catchError(this.handleError<Address>('getOneUserAddress')));
      }
    }
    userAddress(){
      let currentUser = this.authenticationService.currentUserValue;
      if(currentUser){
        return this.http.get<Address[]>(`${environment.apiUrl}/api/user-address`,this.httpOptions)
                .pipe(catchError(this.handleError<Address[]>('getUserAddresses', [])));
      }
    }

    saveAddress(address: Address){
      let currentUser = this.authenticationService.currentUserValue;
      if(currentUser){
        let addressparams = new HttpParams()
                            .append('fullname', address.fullname)
                            .append('contact', address.mobilenumber.toString())
                            .append('other_notes', address.other_notes)
                            .append('building', address.building)
                            .append('province', address.province)
                            .append('city', address.city)
                            .append('brgy', address.brgy)
                            .append('type', address.type.toString())

        return this.http.post(`${environment.apiUrl}/api/billing-address`, this.httpOptions,
                  { params: addressparams  });
      }
    }
    updateAddress(address: Address){

      let headers = new Headers();
      headers.set('Content-Type', 'application/json');

      let currentUser = this.authenticationService.currentUserValue;
      if(currentUser){
        let addressparams = new HttpParams()
                            .set('fullname', address.fullname)
                            .set('contact', address.mobilenumber.toString())
                            .set('other_notes', address.other_notes)
                            .set('building', address.building)
                            .set('province', address.province)
                            .set('city', address.city)
                            .set('brgy', address.brgy)
                            .set('type', address.type.toString())
                            .set('address_id', address.id.toString());

        return this.http.put(`${environment.apiUrl}/api/billing-address`,null, { params:addressparams })
                .pipe(tap( data => {
                  console.log( data );
                }));
      }
    }

    updateMobile(mobile: number, address_id: number){

      let headers = new Headers();
      headers.set('Content-Type', 'application/json');

      let currentUser = this.authenticationService.currentUserValue;
      if(currentUser){
        let mobiles = new HttpParams()
                            .set('address_id', address_id.toString())
                            .set('contact', mobile.toString());
        console.log(mobiles);

        return this.http.put(`${environment.apiUrl}/api/billing-address`,null, { params : mobiles })
                .pipe(tap( data => {
                }));
      }
    }

    deleteAddress(addressId: number){
      return this.http.delete(`${environment.apiUrl}/api/user-address/${addressId}`).pipe(
            map((response: Address) => {
              this.router.navigateByUrl('/not-found', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/dashboard/account/address-book']);
                this.notyf.success(response.message);
              });
            })
      );
    }

    province(){
        return this.http.get(`${ADDRESS_API}/api/province-radius`)
          .pipe(
            // tap(_ => console.log('fetched cart')),
            catchError(this.handleError('getProvice', []))
        );
    }

    selected_province_cities(provinceId){
      let provId = provinceId.toString();
      return this.http.get(`${ADDRESS_API}/api/province-cities`,
            { params:
              { province_id : provId }
            })
              .pipe(
                // tap(_ => console.log('fetched cart')),
                catchError(this.handleError('getProviceCities', []))
            );
    }

    selected_city_barangays(cityId){
      let citId = cityId.toString();
      return this.http.get(`${ADDRESS_API}/api/city-barangays`,
            { params:
              { city_id : citId }
            })
              .pipe(
                // tap(_ => console.log('fetched cart')),
                catchError(this.handleError('getProviceCities', []))
            );
    }

    setDefaultShipping(addressId: number){
      let params = new HttpParams().set('shipping', '1');
      return this.http.put(`${environment.apiUrl}/api/default-address/${addressId}`,null,{params: params})
    }
    setDefaultBilling(addressId: number){
      let params = new HttpParams().set('billing', '1');
      return this.http.put(`${environment.apiUrl}/api/default-address/${addressId}`,null, {params: params})
    }
}
