import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { AddressState } from "../state/address-search-bar/address.state";
import L from "leaflet";
import { GetHomeSafetyVerdict } from "../state/street-map/street-map.actions";
import { Address } from "../state/address-search-bar/address.model";

@Component({
    selector: 'street-map',
    standalone: true,
    imports: [],
    templateUrl: './street-map.component.html',
    styleUrl: './street-map.component.scss',
})
export class StreetMapComponent implements OnInit {
    map: L.Map | undefined;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.initMap();

        this.store.select(AddressState.address).subscribe(address => {
            if (this.map && address) {
                const { lat, long } = address;

                this.store.dispatch(new GetHomeSafetyVerdict(lat, long));
                this.addMarker(address);
            }
        });
    }

    initMap(): void {
        this.map = L.map('map', {
            center: [45, -75],
            zoom: 7
        });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        L.Marker.prototype.options.icon = L.icon({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
          });
    }

    addMarker(address: Address): void {
        if (this.map) {
            const { lat, long, street } = address;

            this.map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    this.map?.removeLayer(layer);
                }
            });

            const marker = L.marker([lat, long]).addTo(this.map);
            marker.bindPopup(`${street}`).openPopup();

            this.map.setView([lat, long], 18);
        }
    }
}