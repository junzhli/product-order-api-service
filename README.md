## Installation

```bash
$ yarn install
```

## Running the app

To run locally, we run containers with `docker-compose` to set up prerequisites
- Postgres

```shell
docker-compose -d up
```

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