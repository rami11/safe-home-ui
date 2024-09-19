import { State, Action, StateContext, Selector } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoadAddressSuggestions, LoadAddressSuggestionsSuccess, LoadAddressSuggestionsFailure } from './address.actions';
import { AddressStateModel } from './address.model';

@State<AddressStateModel>({
  name: 'address',
  defaults: {
    suggestions: [],
    loading: false,
    error: null
  }
})
@Injectable()
export class AddressState {
  private apiKey: string = 'API_KEY';

  private mockSuggestions = [
    '123 Rue de la Montagne, Montreal, QC',
    '456 Boulevard Saint-Laurent, Montreal, QC',
    '789 Avenue du Mont-Royal, Montreal, QC'
  ];

  constructor(private http: HttpClient) {}

  @Selector()
  static suggestions(state: AddressStateModel) {    
    return state?.suggestions;
  }

  @Action(LoadAddressSuggestions)
  loadAddressSuggestions(ctx: StateContext<AddressStateModel>, action: LoadAddressSuggestions) {
    ctx.patchState({ loading: true, error: null });

    // Mock API call - replace with actual API call when needed
    return of(this.mockSuggestions).pipe(
      tap({
        next: response => {
          const suggestions = response.filter(suggestion => suggestion.toLocaleLowerCase().includes(action.query.toLowerCase()));
          ctx.dispatch(new LoadAddressSuggestionsSuccess(suggestions));
        },
        error: err => ctx.dispatch(new LoadAddressSuggestionsFailure(err))
      })
    );    
  }

  // @Action(LoadAddressSuggestions)
  // loadAddressSuggestions1(ctx: StateContext<AddressStateModel>, action: LoadAddressSuggestions) {
  //   ctx.patchState({ loading: true, error: null });

  //   // Google Places Autocomplete API request
  //   const apiUrl = 
  //   `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(action.query)}&types=address&components=country:ca&key=${this.apiKey}`;

  //   return this.http.get<any>(apiUrl).pipe(
  //     tap(response => {
  //       const suggestions = response.predictions.map((prediction: any) => prediction.description);
  //       ctx.dispatch(new LoadAddressSuggestionsSuccess(suggestions));
  //     }),
  //     catchError(err => {
  //       ctx.dispatch(new LoadAddressSuggestionsFailure(err));
  //       return of([]);
  //     })
  //   );
  // }

  @Action(LoadAddressSuggestionsSuccess)
  loadAddressSuggestionsSuccess(ctx: StateContext<AddressStateModel>, action: LoadAddressSuggestionsSuccess) {
    ctx.patchState({ suggestions: action.suggestions, loading: false });
  }

  @Action(LoadAddressSuggestionsFailure)
  loadAddressSuggestionsFailure(ctx: StateContext<AddressStateModel>, action: LoadAddressSuggestionsFailure) {
    ctx.patchState({ error: action.error, loading: false });
  }
}