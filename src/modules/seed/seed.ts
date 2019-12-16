import { NestFactory } from '@nestjs/core';

import { SeedModule } from './seed.module';
import { Seeder } from './seeder';
import { users } from './data';

async function bootstrap() {
  NestFactory.createApplicationContext(SeedModule)
    .then(appContext => {
      const seeder = appContext.get(Seeder);

      try {
        users.map(user => seeder.seed(user));
      } catch (e) {
        console.error(e);
      }
    })
    .catch(error => {
      throw error;
    });
}
bootstrap();
