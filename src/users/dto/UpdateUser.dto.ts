import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { IsPasswordValid } from "src/validators/password.validator";

export class UpdateUserDto {
    @IsPasswordValid()
    @MinLength(8)
    @MaxLength(100)
    @IsNotEmpty()
    @IsString()
    password: string
}