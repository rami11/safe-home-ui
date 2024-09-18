import { Component } from '@angular/core';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'address-search-bar',
  standalone: true,
  imports: [NgbTypeaheadModule],
  templateUrl: './address-search-bar.component.html',
  styleUrl: './address-search-bar.component.scss'
})
export class AddressSearchBar {
  private addressList: string[] = [
    '123 Rue Sainte-Catherine Ouest, Montreal, QC',
    '456 Avenue du Mont-Royal, Montreal, QC',
    '789 Boulevard Saint-Laurent, Montreal, QC',
    '1000 Rue Sherbrooke Ouest, Montreal, QC',
    '2500 Chemin de la Côte-Sainte-Catherine, Montreal, QC',
    '3750 Rue McGill, Montreal, QC'
  ];

  search = (text$: Observable<string>): Observable<string[]> => {
    return text$.pipe(
      debounceTime(300), // Wait for 300ms after typing stops
      distinctUntilChanged(), // Only trigger if the input changes
      filter(term => term.length >= 3), // Only show suggestions if the term has 3 or more characters
      map(term => this.addressList.filter(address => address.toLowerCase().includes(term.toLowerCase())).slice(0, 10)) // Show the first 10 matching addresses
    );
  }
}
