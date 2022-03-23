import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Room {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true })
  roomNumber: number;

  @Column()
  reservedOn: Date[];
}
