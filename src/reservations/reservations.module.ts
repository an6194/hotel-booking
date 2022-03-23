import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { Guest } from './entities/guest.entity';
import { Room } from './entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guest, Room])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
