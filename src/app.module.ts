import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MytodoModule } from './mytodo/mytodo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(
    //   `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`,
    //   {
    //     dbName: process.env.DB_NAME,
    //     user: process.env.DB_USER,
    //     pass: process.env.DB_PASS,
    //   },
    // ),
    MongooseModule.forRoot('mongodb://localhost:27017/lcl-db'),
    MytodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
