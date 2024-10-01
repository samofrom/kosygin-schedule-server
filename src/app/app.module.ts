import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingsModule } from '../settings/settings.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { ScheduleModule as CronModule } from '@nestjs/schedule';
import { LessonsModule } from '../lessons/lessons.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../../client'),
      exclude: ['api/*'],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/kosygin_schedule'),
    CronModule.forRoot(),
    SettingsModule,
    ScheduleModule,
    LessonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
