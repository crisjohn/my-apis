import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MytodoModule } from './mytodo/mytodo.module';
import { McModule } from './mc/mc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', 'prod.env'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`,
      {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      },
    ),
    MytodoModule,
    McModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
