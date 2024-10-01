import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Promise} from 'mongoose';
import {Group, GroupDocument} from '../db/schemas/group.schema';

export interface InstituteResponse {
  instituteId: number;
  instituteName: string;
}

@Injectable()
export class SettingsService {
  constructor(@InjectModel('group') private groupModel: Model<GroupDocument>) {
  }

  async getInstitutes(): Promise<InstituteResponse[]> {
    const instituteNames:string[] = await this.groupModel.distinct('instituteName');
    const response = await Promise.all(instituteNames.map(async (instituteName) => {
      const doc = await this.groupModel.findOne({instituteName}).exec();
      const instituteId = doc.instituteId;
      return {
        instituteName,
        instituteId
      }
    }))
    return response;
  }

  async getCoursesByInstituteId(instituteId: string): Promise<string[]> {
    return this.groupModel.find({instituteId}).distinct('course');
  }

  async getGroups(instituteId: string, course: string): Promise<string[]> {
    const groups =  await this.groupModel.find({
      instituteId,
      course
    }).exec();
    return groups.map((group) => group.group)
  }
}
