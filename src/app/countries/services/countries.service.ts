import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url: string = `${this.apiUrl}/alpha/${code}`;

    return this.httpClient.get<Country[]>(url)
    .pipe(
      map(countries => countries.length > 0 ? countries[0]: null),
      catchError(() => of(null))
    );
  }

  /*
  searchCountryByAlphaCode(code: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/alpha/${code}`;

    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(() => of([]))
    );
  }
  */

  searchCapital(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${term}`;

    return this.httpClient.get<Country[]>(url).pipe(
      /*
       tap(countries => console.log('Tap 1', countries)),
       map(countries => []),
       tap(countries => console.log('Tap 2', countries))

      catchError(error => {
        console.log(error);

        return of([])

      })
      */
     catchError(() => ([]))
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/name/${term}`;

    return this.httpClient.get<Country[]>(url).pipe(
     catchError(() => ([]))
    );
  }

  searchRegion(region: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/region/${region}`;

    return this.httpClient.get<Country[]>(url).pipe(
     catchError(() => ([]))
    );
  }
}
