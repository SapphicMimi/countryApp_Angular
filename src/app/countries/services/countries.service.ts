import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => ([])),
        delay(2000),
      );
  }

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

  /*
  searchCapital(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${term}`;

    return this.httpClient.get<Country[]>(url).pipe(

      // tap(countries => console.log('Tap 1', countries)),
      // map(countries => []),
      // tap(countries => console.log('Tap 2', countries))

      // catchError(error => {
      //   console.log(error);

      //   return of([])

      // })

     catchError(() => ([]))
    );
  }
  */

  searchCapital(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${term}`;

    return this.getCountriesRequest(url);
  }

  searchCountry(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/name/${term}`;

    return this.getCountriesRequest(url);
  }

  searchRegion(region: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/region/${region}`;

    return this.getCountriesRequest(url);
  }
}
