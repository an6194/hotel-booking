import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller()
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Post('guest')
  createGuest() {
    return this.reservationsService.createGuest();
  }

  @Post('room')
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.reservationsService.createRoom(createRoomDto);
  }

  @Post('guest/:id/reservations')
  createReservation(
    @Param('id') guestId: string,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return this.reservationsService.createReservation(
      guestId,
      createReservationDto,
    );
  }

  @Get('guest/:id/reservations')
  getReservations(@Param('id') guestId: string) {
    return this.reservationsService.getReservations(guestId);
  }

  @Get('room/:id/reservedOn')
  getReservedOn(@Param('id') roomId: string) {
    return this.reservationsService.getReservedOn(roomId);
  }
}
