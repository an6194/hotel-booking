import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { Reservation } from './reservation.entity';

@Entity()
export class Guest {
  @ObjectIdColumn()
  id: ObjectID;

  @Column((type) => Reservation)
  reservations: Reservation[];
}
