import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})

export class ByRegionPageComponent {
  constructor(private countriesService: CountriesService) {}

  public countries: Country[] = [];
  public isLoading: boolean = false;

  searchByRegion(term: string): void {
    this.isLoading = true;

    this.countriesService.searchRegion(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      })
  }
}
