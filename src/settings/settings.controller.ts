import { Body, Controller, Get, Param } from '@nestjs/common';
import { InstituteResponse, SettingsService } from './settings.service';

@Controller('/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('/getInstitutes')
  getInstitutes(): Promise<InstituteResponse[]> {
    return this.settingsService.getInstitutes();
  }

  @Get('/getCoursesByInstituteId/:instituteId')
  getCoursesByInstituteId(@Param() param): Promise<string[]> {
    return this.settingsService.getCoursesByInstituteId(param.instituteId);
  }

  @Get('/getGroups/:instituteId/:course')
  getGroups(@Param() param): Promise<string[]> {
    return this.settingsService.getGroups(param.instituteId, param.course);
  }
}
