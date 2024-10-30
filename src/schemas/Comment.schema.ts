import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Comment {
    @Prop({ required: true })
    authorId: string

    @Prop({ required: true })
    toId: string

    @Prop({ required: true })
    description: string

    @Prop({ required: true, min: 1, max: 5 })
    rating: number

    @Prop({ required: true })
    isCurrent: boolean

    @Prop({ required: true })
    jobTitle: string
    
    @Prop({ required: true })
    recommend: boolean
}

export const CommentSchema = SchemaFactory.createForClass(Comment)