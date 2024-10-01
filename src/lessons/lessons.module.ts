import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import {MongooseModule} from '@nestjs/mongoose';

import {LessonSchema} from '../db/schemas/lesson.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'lesson', schema: LessonSchema}])],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
