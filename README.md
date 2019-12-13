Before starting this application, make sure that you have installed docker onto your machine.

```
npm ci

npm run start:dev:db

npm run typeorm:migration:generate -- init

npm run typeorm:migration:run

npm run start:dev
