import { TaskDueCalculatorService } from '../taskDueCalculator.service';

describe('TaskDueCalculatorService', () => {
  let taskDueCalculatorService: TaskDueCalculatorService;

  beforeEach(() => {
    taskDueCalculatorService = new TaskDueCalculatorService();
  });

  describe('calculateDueAt', () => {
    it('should return a Date object with the correct due time', () => {
      const now = new Date('2024-01-05T12:00:00');
      const durationInMinutes = 30;

      const dueDate = taskDueCalculatorService.calculateDueAt(
        now,
        durationInMinutes,
      );

      const expectedDueDate = new Date('2024-01-05T12:30:00');
      expect(dueDate).toEqual(expectedDueDate);
    });

    it('should handle negative durationInMinutes correctly', () => {
      const now = new Date('2024-01-05T12:00:00');
      const durationInMinutes = -15;

      const dueDate = taskDueCalculatorService.calculateDueAt(
        now,
        durationInMinutes,
      );

      const expectedDueDate = new Date('2024-01-05T11:45:00');
      expect(dueDate).toEqual(expectedDueDate);
    });
  });
});
