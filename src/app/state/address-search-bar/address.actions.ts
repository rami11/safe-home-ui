export class LoadAddressSuggestions {
    static readonly type = '[Address] Load Address Suggestions';
    constructor(public query: string) {}
  }
  
  export class LoadAddressSuggestionsSuccess {
    static readonly type = '[Address] Load Address Suggestions Success';
    constructor(public suggestions: string[]) {}
  }
  
  export class LoadAddressSuggestionsFailure {
    static readonly type = '[Address] Load Address Suggestions Failure';
    constructor(public error: any) {}
  }