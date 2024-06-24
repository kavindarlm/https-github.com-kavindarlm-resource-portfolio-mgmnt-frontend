export class CreateHolidayDto {
    selectedDates: {year: number, month: number, day: number}[];
    holidayType: string;
    resourceIds: string[];
    createdBy: number;
  }

