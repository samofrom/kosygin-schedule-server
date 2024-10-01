import { Controller, Get, Param } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { Schedule } from '../db/schemas/schedule.schema';
import { LessonDocument } from '../db/schemas/lesson.schema';

@Controller('/lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  getAllTeachers(): Promise<string[]> {
    return this.lessonsService.getAllTeachers();
  }

  @Get('/list/:group')
  getLessonsList(@Param('group') group: string): Promise<string[]> {
    return this.lessonsService.getLessonsList(group);
  }

  @Get('/classroom')
  getClassroomList(): Promise<string[]> {
    return this.lessonsService.getClassroomList();
  }

  @Get('/classroom/:classroom')
  getClassroomSchedule(
    @Param('classroom') classroom: number
  ): Promise<unknown> {
    return this.lessonsService.getClassroomSchedule(classroom);
  }

  @Get(':teacher')
  getTeacherSchedule(@Param('teacher') teacher: string): Promise<unknown> {
    return this.lessonsService.getTeacherSchedule(teacher);
  }
}
