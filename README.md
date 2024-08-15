## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

Create .env file and copy .env.example content

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e
```

## Considerations

SIMPLE_ARRAY should comply with the following format:

```bash
SIMPLE_ARRAY= item1, item2, item3
```

If it's empty, Its default value will be `[]`

`/append` endpoint: 'start' and 'end' query paramerters are both optional.

`/countries` endpoint: 'order' has `asc` as default value.
