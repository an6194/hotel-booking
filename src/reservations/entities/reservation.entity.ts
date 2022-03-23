import { Column } from 'typeorm';

export class Reservation {
  constructor(date: Date, roomNumber: number) {
    this.date = date;
    this.roomNumber = roomNumber;
  }

  @Column()
  date: Date;

  @Column()
  roomNumber: number;
}
