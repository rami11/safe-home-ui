export interface StreetMapModel {
    loading: boolean;
    error: string | undefined;
    verdict: Verdict | undefined
}

export interface Verdict {
    lat: number;
    long: number;
    heatValue: number,
    heatDesc: string,
    dryValue: number,
    dryDesc: string,
    stormValue: number,
    stormDesc: string,
    rainValue: number,
    rainDesc: string,
    floodValue: number,
    floodDesc: string,
    verdict: string
}
