import { Component, OnInit } from '@angular/core';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';
import { CountryService } from '../../services/country.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html'
})
export class SelectorPageComponent implements OnInit {

  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];

  public myForm: FormGroup =  this.fb.group({
    region : ['', [ Validators.required ]],
    country: ['', [ Validators.required ]],
    border: ['', [ Validators.required ]]
  })
  
  constructor(
    private fb: FormBuilder,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.onRegionChange();
    this.onCountryChange();
  }

  get regions(): Region[] {
    return this.countryService.regions;
  }

  public onRegionChange(): void {
    this.myForm.get('region')!.valueChanges.pipe(
      tap( () => this.myForm.get('country')!.setValue('')),
      tap( () => this.borders = []),
      switchMap(region => this.countryService.getCountriesByRegion(region))
    ).subscribe(countries => {
      this.countriesByRegion = countries.sort(
        (a: SmallCountry, b: SmallCountry) => a.name.localeCompare(b.name)
      );
    })
  }

  public onCountryChange(): void {
    this.myForm.get('country')!.valueChanges.pipe(
      tap( () => this.myForm.get('border')!.setValue('')),
      filter( ( value: string ) => value.length > 0 ),
      switchMap(alphaCode => this.countryService.getCountryByAlphaCode(alphaCode)),
      switchMap( country => this.countryService.getCountryBordersByCodes(country.borders))
    ).subscribe(countries => {
      this.borders = countries;
    })
  }
}