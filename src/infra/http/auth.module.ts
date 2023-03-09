import { AuthService } from '@app/use-cases/auth/auth.service';
import { JwtStrategy } from '@infra/guards/strategies/jwt.strategy';
import { LocalStrategy } from '@infra/guards/strategies/local.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
