import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {User} from './users.entity';


@Module({
  imports:[TypeOrmModule.forFeature([User])], //create a repository 
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
