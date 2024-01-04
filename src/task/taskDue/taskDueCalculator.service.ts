import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskDueCalculatorService {
  public calculateDueAt(now: Date, durationInMinutes: number): Date {
    return new Date(now.getTime() + durationInMinutes * 60000);
  }
}
