import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Promise} from 'mongoose';

import {Schedule, ScheduleDocument} from '../db/schemas/schedule.schema';

export interface InstituteResponse {
  instituteId: number;
  instituteName: string;
}

@Injectable()
export class ScheduleService {
  constructor(@InjectModel('schedule') private scheduleModel: Model<ScheduleDocument>) {
  }

  async getScheduleByGroup(group: string): Promise<Schedule> {
    return this.scheduleModel.findOne({group});
  }

}
