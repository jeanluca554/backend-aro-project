import { Module } from '@nestjs/common';
import { DatabaseUserModule } from '../database/database-user.module';
import { UserController } from './controllers/user.controller';
import { CreateUser } from 'src/app/use-cases/user/create-user';

@Module({
  imports: [DatabaseUserModule],
  controllers: [UserController],
  providers: [CreateUser],
})
export class UserModule {}
