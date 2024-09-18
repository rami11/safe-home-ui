import { State, Action, StateContext, Selector } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
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
  private mockSuggestions = [
    '123 Rue de la Montagne, Montreal, QC',
    '456 Boulevard Saint-Laurent, Montreal, QC',
    '789 Avenue du Mont-Royal, Montreal, QC'
  ];

  // constructor(private http: HttpClient) {}

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

  @Action(LoadAddressSuggestionsSuccess)
  loadAddressSuggestionsSuccess(ctx: StateContext<AddressStateModel>, action: LoadAddressSuggestionsSuccess) {
    ctx.patchState({ suggestions: action.suggestions, loading: false });
  }

  @Action(LoadAddressSuggestionsFailure)
  loadAddressSuggestionsFailure(ctx: StateContext<AddressStateModel>, action: LoadAddressSuggestionsFailure) {
    ctx.patchState({ error: action.error, loading: false });
  }
}