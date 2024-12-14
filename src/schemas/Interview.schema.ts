import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Interview {
    @Prop({ required: true })
    userId: string

    @Prop({ required: true })
    companyId: string

    @Prop({ required: true })
    description: string

    @Prop({ required: true, min: 1, max: 5 })
    difficulty: number

    @Prop({ required: true })
    jobTitle: string
}

export const InterviewSchema = SchemaFactory.createForClass(Interview)