import {Body, Controller, Get, Param} from '@nestjs/common';
import {InstituteResponse, ScheduleService} from './schedule.service';
import {Schedule} from '../db/schemas/schedule.schema';

@Controller('/schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('/:group')
  getCoursesByInstituteId(@Param() param): Promise<Schedule> {
    return this.scheduleService.getScheduleByGroup(param.group);
  }

}
