import { IsPositive } from 'class-validator';

export class CreateRoomDto {
  @IsPositive()
  roomNumber: number;
}
