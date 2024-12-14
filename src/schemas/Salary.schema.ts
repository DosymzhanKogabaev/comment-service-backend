import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Salary {
    @Prop({ required: true, unique: true })
    vacancy: string

    @Prop({ required: true })
    companyId: string

    @Prop({ required: true })
    description: string

    @Prop({ required: true })
    salary: number
}

export const SalarySchema = SchemaFactory.createForClass(Salary)