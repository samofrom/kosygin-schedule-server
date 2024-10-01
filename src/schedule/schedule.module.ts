import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import {MongooseModule} from '@nestjs/mongoose';
import {ScheduleSchema} from '../db/schemas/schedule.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'schedule', schema: ScheduleSchema}])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
