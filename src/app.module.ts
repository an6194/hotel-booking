import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configValidationSchema } from './config.schema';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('MONGODB_URL'),
        synchronize: true,
        useUnifiedTopology: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    ReservationsModule,
  ],
})
export class AppModule {}
