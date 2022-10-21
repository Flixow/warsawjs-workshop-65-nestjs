# :fire: warsawjs-workshop-65-nestJS :fire:

## Table of Contents :clipboard:

- [What you can learn](#what-you-can-learn-mortar_board)
- [Setup](#setup-hammer)
- [Possible issues](#possible-issues)
- [Steps](#steps)

## What you can learn :mortar_board:
* :gem: Supertokens
* :gem: Swagger
* :gem: HealthChecks
* :gem: TypeOrm i Postgres
* :gem: ElasticSearch
* :gem: Migrations

## Setup :hammer:
* ```git clone https://github.com/Flixow/warsawjs-workshop-65-nestjs.git```
* ```npm install``` or ```yarn install```
* ```npm run start``` or ```yarn start```

## Possible issues
* ElasticSearch requires at least 2GB RAM memory limit in Docker
* https://stackoverflow.com/questions/56937171/efk-elasticsearch-1-exited-with-code-78-when-install-elasticsearch


## Steps
### Supertokens
* [Supertokens API](https://supertokens.com/docs/thirdpartyemailpassword/nestjs/guide)
* Add forRootAsync to use dynamic config
* Setup sample guarded endpoint
* Add Swagger
* Setup frontend `npx create-react-app frontend`
* Setup [Supertokens frontend](https://supertokens.com/docs/thirdpartyemailpassword/pre-built-ui/setup/frontend)
* Sign up, sign in, check cookies, guarded endpoint and database schema in pgAdmin
* Add health checks

### Typeorm
* ```npm install @nestjs/typeorm typeorm pg```
*  Setup articles module with entity and dto
* ```npm i class-validator class-transformer```
* Add CLI plugin to handle DTO's in swagger automatically

### Elasticsearch
* ```npm install @nestjs/elasticsearch @elastic/elasticsearch```
* Create search module
* "esModuleInterop": true
* Implement Elasticsearch
* Add healthcheck
