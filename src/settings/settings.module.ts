import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import {MongooseModule} from '@nestjs/mongoose';
import {GroupSchema} from '../db/schemas/group.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'group', schema: GroupSchema}])],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
