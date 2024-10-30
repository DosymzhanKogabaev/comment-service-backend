import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"
import { IsPasswordValid } from '../../validators/password.validator';

export class CreateCompanyDto {
    @MaxLength(100)
    @IsNotEmpty()
    @IsString()
    companyName: string

    @IsPasswordValid()
    @MinLength(8)
    @MaxLength(100)
    @IsNotEmpty()
    @IsString()
    password: string
}