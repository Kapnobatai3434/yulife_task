import { NestFactory } from '@nestjs/core';

import { SeedModule } from './seed.module';
import { Seeder } from './seeder';
import { users } from './data';

async function bootstrap() {
  NestFactory.createApplicationContext(SeedModule)
    .then(appContext => {
      const seeder = appContext.get(Seeder);

      return Promise.all(users.map(async user => await seeder.seed(user)));
    })
    .catch(error => {
      throw error;
    });
}
bootstrap();
