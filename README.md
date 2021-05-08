# Deno client for They Said So Quotes API

Simple deno (https://deno.land) client for https://theysaidso.com/api/

## Usage

```typescript
import {QuoteClient} from 'https://raw.githubusercontent.com/dlukanin/deno-they-said-so/main/module/mod.ts';

const client = new QuoteClient();

console.log(await client.daily());
```

You can also check examples folder - https://github.com/dlukanin/deno-they-said-so/tree/main/examples

## Permissions

You need --allow-net permission for running this module

## Rate limit

API can be rate limited. Methods throw `QuoteClientRateLimitError` is the limit is reached

## Plans

- [x] Initial client version
- [ ] Auth
- [ ] Full quote resource
- [ ] Private Quotes
- [ ] Quote Images
- [ ] Qshow

## License

Library is MIT licensed https://github.com/dlukanin/deno-they-said-so/blob/main/LICENSE