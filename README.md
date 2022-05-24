# NestJS Starter Kit

The repository provides examples of the main toolkit used to write a basic service on the NestJS framework.

### Required

1. NodeJS v16.15.0
2. Postgres 12
3. RabbitMQ
4. Redis

### Project structure

```
src
│   main.ts                     ─ App entrypoint
│
├───migrations                  ─ TypeORM migrations folder
│
├───app
│   │   app.module.ts           ─ Application module
│   └───auth
│       ├───guards              ─ Auth guards implementations
│       └───strategies          ─ Auth strategies implementations
│
├───────broker                  ─ Message Broker module (Listeners or events emitter via RabbitMQ)
│                                 For integrations with another service (Message sending, etc.) create new module in app folder.
│                                 Name module what service it represents (Example payment_gateway).
│                                 Use rabbit.config.ts file for configuration, but provide correct queue name by service.
├───────config                  ─ Server configs
│
├───────database
│       │   database.module.ts  ─ Database module with db connection
│       ├───entity              ─ TypeORM entities
│       └───repositories        ─ Database repositories
│
├───────queues
│       │   queues.module.ts    ─ Queues module with redis and jobs connection
│       ├───separate_job        ─ Example of job starting in separate process
│       ├───template_job        ─ Example of job starting in main process
│       └───other jobs module
│
├───────routes
│       │   routes.module.ts    ─ Routes module with routes connection
│       ├───auth                ─ Example of auth routes
│       ├───jobs                ─ Routes for jobs testing
│       ├───users               ─ Routes for users testing
│       ├───template            ─ Other templates routes
│       └───other routes module
│
├───────other modules
│
└───────utils                   ─ Utils.
```