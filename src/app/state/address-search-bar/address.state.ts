import { State, Action, StateContext, Selector } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddressStateModel } from './address.model';
import { GetAddressInfo } from './address.actions';

@State<AddressStateModel>({
  name: 'address',
  defaults: {
    loading: false,
    error: undefined,
    address: undefined
  }
})
@Injectable()
export class AddressState {

  @Selector()
  public static address(state: AddressStateModel): any {
    return state?.address;
  }

  constructor(private http: HttpClient) { }

  @Action(GetAddressInfo)
  getAddressInfo(ctx: StateContext<AddressStateModel>, action: GetAddressInfo) {
    ctx.patchState({ loading: true, error: undefined });

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(action.query)}&format=json&addressdetails=1&limit=1`;

    return this.http.get(url).subscribe({
      next: (response: any) => {
        if (response && response.length > 0) {
          const addressResult = {
            street: response[0].display_name,
            lat: response[0].lat,
            long: response[0].lon
          };

          ctx.patchState({
            loading: false,
            address: addressResult
          });
        } else {
          ctx.patchState({
            loading: false,
            error: 'No address found'
          });
        }
      },
      error: () => {
        ctx.patchState({
          loading: false,
          error: 'Failed to fetch address information'
        });
      }
    });
  }
}