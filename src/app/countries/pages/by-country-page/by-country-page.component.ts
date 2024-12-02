import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})

export class ByCountryPageComponent {
  constructor(private countriesService: CountriesService) {}

  public countries: Country[] = [];
  public isLoading: boolean = false;

  searchByCountry(term: string): void {
    this.isLoading = true;

    this.countriesService.searchCountry(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      })
  }
}
