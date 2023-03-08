import { Module } from '@nestjs/common';
import { DatabaseUserModule } from '../database/database-user.module';
import { UserController } from './controllers/user.controller';
import { CreateUser } from 'src/app/use-cases/user/create-user';
import { FindUsers } from '@app/use-cases/user/find-user';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from '@app/use-cases/auth/auth.service';
import { LocalStrategy } from '@infra/guards/strategies/local.strategy';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
