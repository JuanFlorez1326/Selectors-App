import { map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl: string = 'https://restcountries.com/v3.1';

  constructor(
    private http: HttpClient
  ) { }

  private _regions: Region[] = [
    Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania
  ];

  get regions(): Region[] {
    return [...this._regions]
  }

  public getCountriesByRegion( region: Region ): Observable<SmallCountry[]> {
    if (!region) return of([]);
    const url: string = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url).pipe(map( countries => countries.map( country => ({
      name: country.name.common, cca3: country.cca3, borders: country.borders ?? []
    }))))
  }

  public getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry> {
    const url: string = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url).pipe(
      map( country => ({
        name: country.name.common, cca3: country.cca3, borders: country.borders ?? []
      }))
    );
  }
}