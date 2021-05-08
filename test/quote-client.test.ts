import { assertEquals } from "https://deno.land/std@0.95.0/testing/asserts.ts";
import { QuoteClient } from '../module/quote-client/quote-client.ts';

Deno.test('QuoteClient', async () => {
    const client = new QuoteClient();

    const result = await client.daily();

    console.log('got quote', result);

    assertEquals(typeof result, 'string');
})