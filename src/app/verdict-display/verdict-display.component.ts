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

    getBadgeClass(riskValue: number): string {
        switch (riskValue) {
            case 5:
                return 'bg-black';
            case 4:
                return 'bg-danger';
            case 3:
                return 'bg-warning';
            case 2:
                return 'bg-info';
            case 1:
                return 'bg-success';
            default:
                return 'bg-secondary';
        }
    }

    getRiskDesc(riskValue: number): string {
        switch (riskValue) {
            case 5:
                return 'Major Risk';
            case 4:
                return 'High Risk';
            case 3:
                return 'Moderate Risk';
            case 2:
                return 'Minor Risk';
            case 1:
                return 'Not Significant Risk';
            default:
                return 'Unknown Risk';
        }
    }

    riskValueExists(verdict: Verdict): boolean {
        const { heatValue, dryValue, stormValue, rainValue, floodValue } = verdict;
        return !!(heatValue && dryValue && stormValue && rainValue && floodValue);
    }
}