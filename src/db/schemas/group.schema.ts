import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema()
export class Group {
  @Prop()
  instituteName: string;

  @Prop()
  instituteId: string;

  @Prop()
  course: string;

  @Prop()
  group: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);