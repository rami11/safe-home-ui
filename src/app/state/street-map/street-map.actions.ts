export class GetHomeSafetyVerdict {
    static readonly type = '[Street Map] Get Hom Safety Verdict';
  
    constructor(public lat: number, public long: number) {}
  }