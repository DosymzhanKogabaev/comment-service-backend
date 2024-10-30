import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"
import { IsPasswordValid } from '../../validators/password.validator';

export class CreateUserDto {
    @MaxLength(100)
    @IsNotEmpty()
    @IsString()
    username: string

    @IsPasswordValid()
    @MinLength(8)
    @MaxLength(100)
    @IsNotEmpty()
    @IsString()
    password: string
}