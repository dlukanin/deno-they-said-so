export interface QuoteClientInterface {
    daily(): Promise<string>;
}