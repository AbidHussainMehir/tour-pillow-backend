import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { TourSchema,Tour,TourDocument } from './entities/tour.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }])],

  controllers: [TourController],
  providers: [TourService]
})
export class TourModule {}
