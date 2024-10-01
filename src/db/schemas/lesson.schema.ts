import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson {
  @Prop()
  group: string;

  @Prop()
  dayOfWeek: number;

  @Prop()
  isEven: boolean;

  @Prop()
  lessonNumber: number;

  @Prop()
  time: string;

  @Prop()
  classroom: number;

  @Prop()
  lessonType: string;

  @Prop()
  teacher: string;

  @Prop()
  lesson: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
