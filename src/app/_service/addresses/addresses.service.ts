import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
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
      headers: new HttpHeaders({ Accept : 'application/json'})
    };


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

    /**
     *
     * Get an address details
     * param addressId
     */
    oneUserAddress(addressId: number) {
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
        return this.http.get<Address>(`${environment.apiUrl}/api/user-address/${addressId}/edit`, this.httpOptions)
                .pipe(catchError(this.handleError<Address>('getOneUserAddress')));
      }
    }

    /**
     *
     * User Address List
     *
     */
    userAddress() {
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
        return this.http.get<Address[]>(`${environment.apiUrl}/api/user-address`, this.httpOptions)
                .pipe(catchError(this.handleError<Address[]>('getUserAddresses', [])));
      }
    }

    /**
     *
     * param address
     * Save inputed address
     * if there is no contact value pass the mobilenumber variable value
     * Sorry for not consistent on naming
     *
     */
    saveAddress(address: Address) {
      if (address.contact === '' || address.contact === undefined || address.contact == null) {
        address.contact = address.mobilenumber;
      }
      console.log(address);
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {

        return this.http.post(`${environment.apiUrl}/api/billing-address`, address, this.httpOptions);
      }
    }

    /**
     *
     * param address
     * Update and address
     *
     */
    updateAddress(address: Address) {
      if (address.contact === '' || address.contact === undefined || address.contact === null) {
        address.contact = address.mobilenumber;
      }
      console.log(address);
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {

        return this.http.put(`${environment.apiUrl}/api/billing-address`, address, this.httpOptions)
                .pipe(tap( data => {
                  console.log( data );
                }));
      }
    }

    /**
     *
     * param mobile
     *
     * param addressId
     *
     * Update Mobile from the default shipping address
     *
     */
    updateMobile(mobile: number, addressId: number) {

      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
        const mobileEdit = {
          address_id: addressId,
          contact: mobile
        };
        console.log(mobileEdit);

        return this.http.put(`${environment.apiUrl}/api/billing-address`, mobileEdit, this.httpOptions)
                .pipe(tap( data => {
                }));
      }
    }
    /**
     *
     * param addressId
     * Delete the selected Address
     */
    deleteAddress(addressId: number) {
      return this.http.delete(`${environment.apiUrl}/api/user-address/${addressId}`).pipe(
            map((response: Address) => {
              this.router.navigateByUrl('/not-found', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/dashboard/account/address-book']);
                this.notyf.success(response.message);
              });
            })
      );
    }

    /**
     *
     * Place APIs
     *
     */
    province() {
        return this.http.get(`${ADDRESS_API}/api/province-radius`, this.httpOptions)
          .pipe(
            // tap(_ => console.log('fetched cart')),
            catchError(this.handleError('getProvice', []))
        );
    }

    selected_province_cities(provinceId: number | string) {
      const provId = provinceId.toString();
      return this.http.get(`${ADDRESS_API}/api/province-cities`,
          {
            headers: this.httpOptions.headers ,
            params: {
              province_id : provId
            }
          }).pipe(
            // tap(_ => console.log('fetched cart')),
            catchError(this.handleError('getProviceCities', []))
        );
    }

    selected_city_barangays(cityId: number | string) {
      const citId = cityId.toString();
      return this.http.get(`${ADDRESS_API}/api/city-barangays`,
            { params:
              { city_id : citId }
            })
              .pipe(
                // tap(_ => console.log('fetched cart')),
                catchError(this.handleError('getProviceCities', []))
            );
    }

    /**
     *
     * param addressId
     *
     * Set an address to be shipping or billing
     *
     * 1 == true
     *
     */
    setDefaultShipping(addressId: number) {
      let setAddress: Address;
      setAddress = {
        id: addressId,
        is_shipping: 1
      };
      return this.http.put(`${environment.apiUrl}/api/default-address`, setAddress, this.httpOptions);
    }
    setDefaultBilling(addressId: number) {
      let setAddress: Address;
      setAddress = {
        id: addressId,
        is_billing: 1
      };
      return this.http.put(`${environment.apiUrl}/api/default-address`, setAddress, this.httpOptions);
    }
}
