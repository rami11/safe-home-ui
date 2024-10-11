import { Action, Selector, State, StateContext } from "@ngxs/store";
import { HttpClient } from '@angular/common/http';
import { StreetMapModel } from "./street-map.model";
import { Injectable } from "@angular/core";
import { GetHomeSafetyVerdict } from "./street-map.actions";
import { tap } from "rxjs";

@State<StreetMapModel>({
    name: 'streetMap',
    defaults: {
      loading: false,
      error: undefined,
      verdict: undefined
    }
  })
  @Injectable()
  export class StreetMapState {

    @Selector()
    public static verdict(state: StreetMapModel): any {
      return state?.verdict;
    }

    constructor(private http: HttpClient) { }

    @Action(GetHomeSafetyVerdict)
    getHomeSafetyVerdict(ctx: StateContext<StreetMapModel>, action: GetHomeSafetyVerdict) {
        ctx.patchState({ loading: true, error: undefined });

        const url = `https://iyt2uy7lvl5zcswo7mczdm77cm0oklyl.lambda-url.us-east-1.on.aws/lat/${action.lat}/long/${action.long}`;

        return this.http.get(url)
        .pipe(
          tap(response => console.log('Response:', response))
        )
        .subscribe({
          next: (response: any) => {
            if (response) {
              ctx.patchState({
                loading: false,
                verdict: response
              });
            } else {
              ctx.patchState({
                loading: false,
                error: 'Something went wrong! No verdict found'
              });
            }
          },
          error: () => {
            ctx.patchState({
              loading: false,
              error: 'Failed to fetch home safety verdict'
            });
          }
        });
    }
  }