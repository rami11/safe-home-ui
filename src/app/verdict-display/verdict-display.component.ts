import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { StreetMapState } from "../state/street-map/street-map.state";

@Component({
    selector: 'verdict-display',
    standalone: true,
    imports: [],
    templateUrl: './verdict-display.component.html',
    styleUrl: './verdict-display.scss',
})
export class VerdictDisplayComponent implements OnInit {
    verdict!: string;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.store.select(StreetMapState.verdict).subscribe(verdict => {
            this.verdict = verdict;
        });
    }
}