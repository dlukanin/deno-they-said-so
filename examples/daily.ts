import {QuoteClient} from 'https://raw.githubusercontent.com/dlukanin/deno-they-said-so/main/mod.ts';

const client = new QuoteClient();

console.log(await client.daily());