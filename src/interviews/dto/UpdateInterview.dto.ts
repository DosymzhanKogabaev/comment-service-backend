import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateInterviewDto {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    description: string

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    difficulty: number
    
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    jobTitle: string
}