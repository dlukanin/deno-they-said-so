export class QuoteClientRateLimitError extends Error {
    constructor(
        readonly originalMessage: string,
    ) {
        super('Rate limit error. Original message is: ' + originalMessage);
    }
}