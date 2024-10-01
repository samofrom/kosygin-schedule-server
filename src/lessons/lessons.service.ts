import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LessonDocument } from '../db/schemas/lesson.schema';

interface Couple extends Array<LessonDocument> {}

interface DayOfWeek {
  location: string;
  dayOfWeek: string;
  odd: Couple[];
  even: Couple[];
}

interface Lesson {
  lessonNumber: string;
  time: string;
  classroom: string;
  lessonType: string;
  teacher: string;
  lesson: string;
}

const getDayOfWeek = (dayOfWeek: number) => {
  switch (dayOfWeek) {
    case 0:
      return 'Понедельник';
    case 1:
      return 'Вторник';
    case 2:
      return 'Среда';
    case 3:
      return 'Четверг';
    case 4:
      return 'Пятница';
    case 5:
      return 'Суббота';
  }
};

const makeCouple = (lessons: LessonDocument[]) => {
  const size = 2;
  const result = [];
  for (let i = 0; i < Math.ceil(lessons.length / size); i++) {
    result[i] = lessons.slice(i * size, i * size + size);
  }
  return result;
};

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel('lesson') private lessonModel: Model<LessonDocument>
  ) {}

  async getAllTeachers(): Promise<string[]> {
    const teachers: string[] = await this.lessonModel
      .distinct('teacher')
      .exec();
    const fteachers = teachers
      .filter(Boolean)
      .filter((teacher) =>
        /^[А-ЯЁ][а-яё]+(?:-[А-ЯЁ][а-яё]+)? [А-ЯЁ]\.[А-ЯЁ]\.$/.test(teacher)
      );

    return fteachers;
  }

  async getTeacherSchedule(teacher: string): Promise<unknown> {
    const teacherQuery = await this.lessonModel
      .find({
        teacher: {
          $regex: teacher,
        },
      })
      .sort({
        dayOfWeek: 'asc',
        lessonNumber: 'asc',
      })
      .exec();

    const schedule = [];

    for (let i = 0; i <= 5; i++) {
      schedule[i] = {
        location: '',
        dayOfWeek: getDayOfWeek(i),
        even: Array(12),
        odd: Array(12),
      };
    }

    teacherQuery.forEach((lesson) => {
      if (lesson.isEven) {
        schedule[lesson.dayOfWeek].even[lesson.lessonNumber - 1] = lesson;
      } else schedule[lesson.dayOfWeek].odd[lesson.lessonNumber - 1] = lesson;
    });

    schedule.forEach((dayOfWeek) => {
      dayOfWeek.even = makeCouple(dayOfWeek.even);
      dayOfWeek.odd = makeCouple(dayOfWeek.odd);
    });

    return schedule;
  }

  async getLessonsList(group: string): Promise<string[]> {
    const lessons: string[] = await this.lessonModel
      .find({
        group: group,
      })
      .distinct('lesson');
    console.log(group);
    return lessons;
  }

  async getClassroomList(): Promise<string[]> {
    const classrooms: string[] = await this.lessonModel
      .distinct('classroom')
      .exec();
    const fclassrooms = classrooms
      .filter(Boolean)
      .filter((classroom) => /^\d+$/.test(classroom));
    return fclassrooms;
  }

  async getClassroomSchedule(classroom: number): Promise<unknown> {
    const teacherQuery = await this.lessonModel.find({ classroom }).exec();

    const schedule = [];

    for (let i = 0; i <= 5; i++) {
      schedule[i] = {
        location: '',
        dayOfWeek: getDayOfWeek(i),
        even: Array(12),
        odd: Array(12),
      };
    }

    teacherQuery.forEach((lesson) => {
      if (lesson.isEven) {
        schedule[lesson.dayOfWeek].even[lesson.lessonNumber - 1] = lesson;
      } else schedule[lesson.dayOfWeek].odd[lesson.lessonNumber - 1] = lesson;
    });

    schedule.forEach((dayOfWeek) => {
      dayOfWeek.even = makeCouple(dayOfWeek.even);
      dayOfWeek.odd = makeCouple(dayOfWeek.odd);
    });

    return schedule;
  }
}
