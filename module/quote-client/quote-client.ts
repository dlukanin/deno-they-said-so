import { QuoteClientInterface } from './quote-client.interface.ts';
import { QuoteClientError, QuoteClientErrorEnum } from './quote-client.error.ts';
import { QuoteClientValidationError } from './quote-client-validation.error.ts';
import { QuoteClientRateLimitError } from './quote-client-rate-limit.error.ts';

export class QuoteClient implements QuoteClientInterface {
    #dailyUrl = 'https://quotes.rest/qod?language=en';
    #quoteSeparator = '-';
    #quoteSemicolon = '"';
    #rateLimitErrorCode = 429;

    async daily(): Promise<string> {
        let result: Response;
        try {
            result = await fetch(this.#dailyUrl);
        } catch (e) {
            throw new QuoteClientError(QuoteClientErrorEnum.REQUEST_FAIL, e);
        }

       return await this.processResponse(result);
    }

    private async processResponse(res: Response): Promise<string> {
        let json;
        try {
            json = await res.json();
        } catch (e) {
            throw new QuoteClientError(QuoteClientErrorEnum.RESPONSE_PARSE, e);
        }

        if (json?.error?.code === this.#rateLimitErrorCode) {
            throw new QuoteClientRateLimitError(json?.error?.message);
        }

        const quotes = json?.contents?.quotes;

        if (!quotes?.length) {
            throw new QuoteClientValidationError(json);
        }

        const quote = quotes[0];

        if (!quote?.quote || !quote?.author) {
            throw new QuoteClientValidationError(json);
        }

        return this.#quoteSemicolon + quote.quote + this.#quoteSemicolon + ' ' + this.#quoteSeparator + quote.author;
    }
}