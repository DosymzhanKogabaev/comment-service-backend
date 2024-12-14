import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator"

export class CreateSalaryDto {
    @IsNotEmpty()
    @IsString()
    companyId: string

    @IsNotEmpty()
    @IsString()
    vacancy: string

    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    salary: number
}