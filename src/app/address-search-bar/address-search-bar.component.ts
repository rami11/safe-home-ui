import { Component } from '@angular/core';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { LoadAddressSuggestions } from '../state/address-search-bar/address.actions';
import { AddressState } from '../state/address-search-bar/address.state';

@Component({
  selector: 'address-search-bar',
  standalone: true,
  imports: [NgbTypeaheadModule],
  templateUrl: './address-search-bar.component.html',
  styleUrl: './address-search-bar.component.scss',
})
export class AddressSearchBar {
  suggestions$: Observable<string[]>;

  constructor(private store: Store) {
    this.suggestions$ = this.store.select(AddressState.suggestions);
  }

  search = (text$: Observable<string>): Observable<string[]> => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term.length >= 3),
      switchMap(term => {
        this.store.dispatch(new LoadAddressSuggestions(term));
        return this.suggestions$;
      })
    );
  };

  formatter = (address: string) => address;
}
