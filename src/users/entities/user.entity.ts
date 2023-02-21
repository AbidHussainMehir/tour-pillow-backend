import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({type: String, select: false })
    password:  { type: String, select: false };

    @Prop({ type: Date, default: Date.now() })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);