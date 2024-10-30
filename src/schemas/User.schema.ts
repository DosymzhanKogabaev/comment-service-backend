import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    username: string

    @Prop({ required: true })
    password: string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
    comments: Comment[]
    
    @Prop({ default: 0 })
    rating: number;
}

export const UserSchema = SchemaFactory.createForClass(User)