import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';

import { DatabaseUserModule } from './infra/database/database-user.module';
import { UserModule } from './infra/http/user.module';
import { AuthModule } from '@infra/http/auth.module';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    DatabaseUserModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
