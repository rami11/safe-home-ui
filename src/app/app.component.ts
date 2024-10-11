import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddressSearchBarComponent } from './address-search-bar/address-search-bar.component';
import { StreetMapComponent } from "./street-map/street-map.component";
import { VerdictDisplayComponent } from "./verdict-display/verdict-display.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AddressSearchBarComponent,
    StreetMapComponent,
    VerdictDisplayComponent,
    VerdictDisplayComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'flood-insight';
}
