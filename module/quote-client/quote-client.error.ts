export enum QuoteClientErrorEnum {
    RESPONSE_PARSE ='RESPONSE_PARSE',
    REQUEST_FAIL = 'REQUEST_FAIL',
}

export class QuoteClientError extends Error {
    constructor(
        readonly code: QuoteClientErrorEnum,
        readonly originalError?: Error,
    ) {
        super('An error while fetch quote ' + code + ' Original error message is ' + originalError?.message);
    }
}