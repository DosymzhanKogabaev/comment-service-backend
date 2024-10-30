import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator";
import { IsPasswordValid } from "src/validators/password.validator";

export class UpdateCompanyDto {
    @IsPasswordValid()
    @MinLength(8)
    @MaxLength(100)
    @IsString()
    @IsOptional()
    password: string

    @IsOptional()
    @IsString()
    @IsUrl()
    imgUrl: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsString()
    @IsUrl()
    websiteUrl: string

    @IsOptional()
    @IsNumber()
    employeesNumber: number

    @IsOptional()
    @IsString()
    city: string

    @IsOptional()
    @IsNumber()
    yearFounded: number
}