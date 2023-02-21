import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TourDocument = Tour & Document;

@Schema()
export class Tour {
    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true, unique: true })
    slug: string;

    @Prop({ type: Number, min: 0, required: true })
    price: number;

    @Prop({
        type: String,
        default: 'ACTIVE',
        enum: ['ACTIVE', 'DISABLE'],
    })
    status: string;

    @Prop()
    overview: string;

    @Prop({
        type: [{ itemList: { type: String }, status: { type: Boolean }, order: { type: Number, default: 1 } }]
    })
    overviewList: [{ itemList: string; status: boolean, order: number }];

    @Prop()
    description: string;

    @Prop()
    includedItems: [{ title: string; status: boolean, order: number }];

    @Prop({
        type: [{
            url: { type: String }, status: { type: Boolean }, order: { type: Number, default: 1 }, type: {
                type: String,
                default: 'IMAGE',
                enum: ['IMAGE', 'VIDEO'],
            }
        }]

    })
    images: [{ url: string; thumbnailUrl:string; status: boolean, order: number, type: string }];

    @Prop()
    note: string;

    @Prop()
    noteItems: [{ title: string; status: boolean, order: number }];

    @Prop()
    reasonToChooseUs: string;

    @Prop()
    meeting: [
        {
            title: string;
            status: boolean;
            address: string;
            googleCoords: string;
            note: string,
            time:Date
        },
    ];

    @Prop()
    shortDescription:string;

    @Prop()
    thumbnailImage:string;
    

    // @Prop()
    // questions: [
    //     {
    //         question: string;
    //         answer: boolean;
    //         date: Date;

    //     },
    // ];

    @Prop({ type: Date, default: Date.now() })
    createdAt: Date;
}

export const TourSchema = SchemaFactory.createForClass(Tour);