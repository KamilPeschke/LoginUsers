import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/users.entity';
import { Reports } from './reports/reports.entinty';
import { ConfigModule,ConfigService } from '@nestjs/config';

const cookieSession = require('cookie-session');

@Module({
  //configure connection to SQLite
 imports:[
  ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:`.env.${process.env.NODE_ENV}`,
  }),TypeOrmModule.forRootAsync({
    inject:[ConfigService],
    useFactory:(config: ConfigService) => {
      return{
        type:'sqlite',
        database: config.get<string>('DB_NAME'),
        synchronize: true,
        entities:[User,Reports]
      }
    }
  })
  // TypeOrmModule.forRoot({
  //   type:'sqlite',
  //   database: process.env.NODE_ENV === 'test' ? 'test.sqlite' : 'db.sqlite',
  //   entities: [User, Reports],
  //   synchronize: true,
  // })
  ,UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService,
     {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist:true,
      })
     }
],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(cookieSession({
      keys:['asdfasdf']
    })).forRoutes('*');
  }
}
