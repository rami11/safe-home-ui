import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetAddressInfo } from '../state/address-search-bar/address.actions';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressState } from '../state/address-search-bar/address.state';

@Component({
  selector: 'address-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './address-search-bar.component.html',
  styleUrl: './address-search-bar.component.scss',
})
export class AddressSearchBarComponent implements OnInit {
  addressForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private store: Store) {
    this.addressForm = this.fb.group({
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.store.select(AddressState.loading).subscribe(loading => {
      this.loading = loading;
    });
  }

  onSubmit() {
    if (this.addressForm.valid) {
      this.store.dispatch(new GetAddressInfo(this.addressForm.value.address));
    }
  }
}
