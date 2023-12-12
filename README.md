## Prerequisites
- Node.js 18.x `node`
- `yarn`
- `npx`
- Postgres

### Running database locally with docker
To run locally
```shell
$ docker-compose -d up
```

## Installation

```bash
$ yarn install
```

## Set up database

```bash
$ npx sequelize-cli db:migrate
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Swagger api

Go to `http://localhost:3000/api`