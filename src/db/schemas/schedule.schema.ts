import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScheduleDocument = Schedule & Document;

interface Lesson {
  "lessonNumber": string,
  "time": string,
  "classroom": string,
  "lessonType": string,
  "teacher": string,
  "lesson": string
}

interface Couple extends Array<Lesson> {}

interface DayOfWeek {
  location: string;
  dayOfWeek: string;
  odd: Couple[];
  even: Couple[];
}

@Schema()
export class Schedule {
  @Prop()
  group: string;

  @Prop()
  schedule: DayOfWeek[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);