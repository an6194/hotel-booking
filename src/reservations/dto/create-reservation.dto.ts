import { IsISO8601, IsPositive } from 'class-validator';

export class CreateReservationDto {
  @IsISO8601({ strict: true })
  date: string;

  @IsPositive()
  roomNumber: number;
}
