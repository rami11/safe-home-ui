import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { StreetMapState } from "../state/street-map/street-map.state";
import { Verdict } from "../state/street-map/street-map.model";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'verdict-display',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './verdict-display.component.html',
    styleUrl: './verdict-display.scss',
})
export class VerdictDisplayComponent implements OnInit {
    verdict!: Verdict;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.store.select(StreetMapState.verdict).subscribe(verdict => {
            this.verdict = verdict;
        });
    }

    getBadgeClass(riskDesc: string): string {
        switch (riskDesc) {
            case 'Severe':
                return 'bg-danger';
            case 'Moderate':
                return 'bg-warning';
            case 'Minor':
                return 'bg-info';
            case 'Not Significant':
                return 'bg-success';
            default:
                return 'bg-secondary';
        }
    }

    riskDescExists(verdict: Verdict): boolean {
        const { heatDesc, dryDesc, stormDesc, rainDesc, floodDesc } = verdict;
        return !!(heatDesc && dryDesc && stormDesc && rainDesc && floodDesc);
    }
}