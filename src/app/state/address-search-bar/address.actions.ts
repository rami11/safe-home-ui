export class GetAddressInfo {
  static readonly type = '[Address] Get Address Info';

  constructor(public query: string) {}
}