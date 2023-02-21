
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private collectionModel: Model<UserDocument>) { }
    //get user for login
    async findOne(email: string, password: string): Promise<User | undefined> {
        try {
            return this.collectionModel.findOne({ email: email }).populate('password', '-password').exec();
        } catch (error) {
            return null;
        }
    }

    async create(createUserDto: CreateUserDto) {
        try {
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
            let newUser = { ...createUserDto, password: hash }

            const createdCollection = new this.collectionModel(newUser);
            let res = await createdCollection.save();
            return this.collectionModel.findById({ _id: res.id });

        } catch (error) {
            return error;
        }

    }
}
