import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/notification.module';
import { DatabaseUserModule } from './infra/database/database-user.module';
import { UserModule } from './infra/http/user.module';
import { AuthModule } from '@infra/http/auth.module';
import { TransactionModule } from '@infra/http/transaction.module';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@infra/guards/jwt-auth.guard';
import { AppController } from '@infra/http/controllers/app.controller';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    DatabaseUserModule,
    UserModule,
    AuthModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
