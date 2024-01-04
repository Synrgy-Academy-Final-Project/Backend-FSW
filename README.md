# RESTful API

## How to use?

```
$ git clone https://github.com/Synrgy-Academy-Final-Project/Backend-FSW.git  # get source code of the repository
$ cp .env.example .env                                                       # copy file .env.example to .env
$ npm install                                                                # install package
```

## Database

```
$ docker compose up -d      # run database
$ docker compose down -v    # delete database and the volume
```

## Scripts

```
$ npm run build                                # build typescript project
$ npm run dev                                  # run in development mode
$ npm run setup                                # run migration, seeder
$ npm run knex migrate:make migration_name     # create new file migration
$ npm run knex seed:make seed_name             # create new file seeds
$ npm run keys                                 # create private and public key jwt, no passphrase
```
