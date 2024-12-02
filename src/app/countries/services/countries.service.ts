import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {term: '', countries: []},
    byCountries: {term: '', countries: []},
    byRegion: {region: '', countries: []}
  }

  constructor(private httpClient: HttpClient) {
    // Como este no es un componente de Angular, se puede hacer directamente en el constructor porque es parte de lo
    // que se quiere que se inicialice.
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => ([])),
        // delay(2000),
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

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = {term: term, countries: countries}),
        tap(() => this.saveToLocalStorage())
      );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/name/${term}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountries = {term: term, countries: countries}),
        tap(() => this.saveToLocalStorage())
      );
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url: string = `${this.apiUrl}/region/${region}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = {region: region, countries: countries}),
        tap(() => this.saveToLocalStorage())
      );
  }
}
