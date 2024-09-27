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
export class AddressSearchBar implements OnInit {
  address: any;
  addressJson!: string;

  addressForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.store.select(AddressState.address).subscribe(address => {
      this.address = address;
      this.addressJson = JSON.stringify(address);
    });

    this.addressForm = this.fb.group({
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    if (this.addressForm.valid) {
      console.log('Address submitted:', this.addressForm.value);
      this.store.dispatch(new GetAddressInfo(this.addressForm.value.address));
    }
  }
}
