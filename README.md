
#### Before starting this application, make sure that you have installed docker onto your machine.

```
npm ci

npm run start:dev:db //you might need to add permissions

npm run typeorm:migration:generate -- init

npm run typeorm:migration:run

npm run seed //if you want to populate DB with some data

npm start

go to http://localhost:3000/graphql to see GraphQl Playground
```


##### Currently all queries are protected with JWT and user roles.
##### Only mutation createUser is opened. So for current implementation, while creating user please query token also and add it in playgroud headers for further queries.

```
{
  "authorization" :"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhmNmEwNTVmLWVmMWMtNDEyOC05OWRjLTdmMTRiYTdkMzA1MSIsInVzZXJuYW1lIjoiZmFrZTIiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTU3NjMzNjYxNCwiZXhwIjoxNTc2MzM3NTE0fQ.1hp4N15xjCg07niGYSDA3eV-a4rUgbCYs8n7XqK2wzA"
}
```

##### There are around 25 unit tests for resolver and service.
For e2e tests I'm using sqlite db, populating it with seed data. 

That way I'm able to cover all integration logic, middlewares and etc without using production DB.

```
npm t

npm run test:cov
```
