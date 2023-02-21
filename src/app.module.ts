import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express"
import { TourModule } from './tour/tour.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    MulterModule.register({ dest: './uploads' }),
    MongooseModule.forRoot('mongodb://abid:abid1080@cluster0-shard-00-00.flijv.mongodb.net:27017,cluster0-shard-00-01.flijv.mongodb.net:27017,cluster0-shard-00-02.flijv.mongodb.net:27017/tourpillow?ssl=true&replicaSet=atlas-uzx9bs-shard-0&authSource=admin&retryWrites=true&w=majority'),
     TourModule,
     AuthModule,
     UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
