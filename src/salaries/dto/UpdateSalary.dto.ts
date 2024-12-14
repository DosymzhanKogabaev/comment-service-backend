import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class UpdateSalaryDto {
    @IsNotEmpty()
    @IsString()
    vacancy: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    salary: number
}