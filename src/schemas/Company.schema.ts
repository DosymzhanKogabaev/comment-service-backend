import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Comment } from "./Comment.schema";
import mongoose from "mongoose";

@Schema()
export class Company {
    @Prop({ required: true, unique: true })
    companyName: string
    
    @Prop({ required: true })
    password: string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
    comments: Comment[]

    @Prop({ default: 0 })
    rating: number;

    @Prop({ required: false })
    imgUrl: string

    @Prop({ required: false })
    description: string

    @Prop({ required: false })
    websiteUrl: string

    @Prop({ required: false })
    employeesNumber: number

    @Prop({ required: false })
    city: string

    @Prop({ required: false })
    yearFounded: number
}

export const CompanySchema = SchemaFactory.createForClass(Company)