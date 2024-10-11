import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { AddressState } from "../state/address-search-bar/address.state";
import L from "leaflet";
import { GetHomeSafetyVerdict } from "../state/street-map/street-map.actions";

@Component({
    selector: 'street-map',
    standalone: true,
    imports: [],
    templateUrl: './street-map.component.html',
    styleUrl: './street-map.component.scss',
})
export class StreetMapComponent implements OnInit {
    map: L.Map | undefined;
    address: any;
    addressJson!: string;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.initMap();

        this.store.select(AddressState.address).subscribe(address => {
            this.address = address;
            this.addressJson = JSON.stringify(address);

            if (this.map && this.address) {
                console.log('store:', this.store);
                this.store.dispatch(new GetHomeSafetyVerdict(address.lat, address.long));
                
                this.addMarker(address.lat, address.long);
            
            }
        });
    }

    initMap(): void {
        this.map = L.map('map', {
            center: [45, -75],
            zoom: 13
        });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 5,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
    }

    addMarker(lat: number, long: number): void {
        if (this.map) {
            this.map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    this.map?.removeLayer(layer);
                }
            });

            const marker = L.marker([lat, long]).addTo(this.map);
            marker.bindPopup(`${this.address.street}`).openPopup();

            this.map.setView([lat, long], 13);
        }
    }
}