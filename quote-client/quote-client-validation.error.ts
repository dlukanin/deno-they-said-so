export class QuoteClientValidationError extends Error {
    constructor(
        readonly body: unknown,
    ) {
        super('An error while validating quote response. Body is not valid ' + JSON.stringify(body));
    }
}