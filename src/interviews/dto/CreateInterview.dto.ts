import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateInterviewDto {
    @IsNotEmpty()
    @IsString()
    userId: string

    @IsNotEmpty()
    @IsString()
    companyId: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    difficulty: number
    
    @IsNotEmpty()
    @IsString()
    jobTitle: string
}