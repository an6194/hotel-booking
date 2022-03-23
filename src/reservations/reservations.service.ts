import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { Guest } from './entities/guest.entity';
import { Room } from './entities/room.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Guest) private guestRepository: MongoRepository<Guest>,
    @InjectRepository(Room) private roomRepository: MongoRepository<Room>,
  ) {}

  createGuest() {
    const guest = this.guestRepository.create();

    guest.reservations = [];

    return this.guestRepository.save(guest);
  }

  createRoom(createRoomDto: CreateRoomDto) {
    const { roomNumber } = createRoomDto;

    const room = this.roomRepository.create({ roomNumber });

    room.reservedOn = [];

    return this.roomRepository.save(room);
  }

  async createReservation(
    guestId: string,
    createReservationDto: CreateReservationDto,
  ) {
    const { date, roomNumber } = createReservationDto;

    const dateWithoutTime = date.split('T')[0];
    const dateObj = new Date(dateWithoutTime);

    const guest = await this.guestRepository.findOne(guestId);

    if (!guest) {
      throw new NotFoundException();
    }

    const room = await this.roomRepository.findOne({ roomNumber });

    if (!room) {
      throw new NotFoundException();
    }

    const reservedValues = room.reservedOn.map((date) => date.valueOf());
    const reservedSet = new Set(reservedValues);

    const isDateReserved = reservedSet.has(dateObj.valueOf());

    if (isDateReserved) {
      throw new BadRequestException('Date is already reserved');
    }

    const reservation = new Reservation(dateObj, roomNumber);

    guest.reservations.push(reservation);
    room.reservedOn.push(dateObj);

    await this.guestRepository.save(guest);
    await this.roomRepository.save(room);

    return reservation;
  }

  async getReservations(guestId: string) {
    const guest = await this.guestRepository.findOne(guestId);

    if (!guest) {
      throw new NotFoundException();
    }

    return guest.reservations;
  }

  async getReservedOn(roomId: string) {
    const room = await this.roomRepository.findOne(roomId);

    if (!room) {
      throw new NotFoundException();
    }

    return room.reservedOn;
  }
}
