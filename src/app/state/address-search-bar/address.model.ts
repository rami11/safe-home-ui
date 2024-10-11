export interface AddressStateModel {
  loading: boolean;
  error: string | undefined;
  address: Address | undefined
}

export interface Address {
  street: string;
  lat: number;
  long: number;
}