import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDataDocument = FileData & Document;

interface IFileData {
  course: string;
  lastChange: string;
  link: string;
}

interface IForm {
  [name: string]: Array<IFileData>;
}

@Schema()
export class FileData {
  @Prop()
  instituteId: string;

  @Prop()
  instituteName: string;

  @Prop()
  forms: Array<IForm>;
}

export const FileDataSchema = SchemaFactory.createForClass(FileData);
