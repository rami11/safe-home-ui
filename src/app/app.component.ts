import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddressSearchBar } from '../address-search-bar/address-search-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddressSearchBar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'flood-insight';
}
