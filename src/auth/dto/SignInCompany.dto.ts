import { IsNotEmpty, IsString } from "class-validator"

export class SignInCompanyDto {
    @IsNotEmpty()
    @IsString()
    companyName: string

    @IsNotEmpty()
    @IsString()
    password: string
}