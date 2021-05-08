import { QuoteClientInterface } from './quote-client.interface.ts';
import { QuoteClientError, QuoteClientErrorEnum } from './quote-client.error.ts';
import { QuoteClientValidationError } from './quote-client-validation.error.ts';

export class QuoteClient implements QuoteClientInterface {
    #dailyUrl = 'https://quotes.rest/qod?language=en';

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

        const quotes = json?.contents?.quotes;

        if (!quotes?.length) {
            throw new QuoteClientValidationError(json);
        }

        const quote = quotes[0].quote;

        if (!quote) {
            throw new QuoteClientValidationError(json);
        }

        return quote;
    }
}