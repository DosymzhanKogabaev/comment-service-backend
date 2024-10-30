import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    authorId: string

    @IsNotEmpty()
    @IsString()
    toId: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    rating: number

    @IsNotEmpty()
    @IsBoolean()
    isCurrent: boolean
    
    @IsNotEmpty()
    @IsString()
    jobTitle: string
    
    @IsNotEmpty()
    @IsBoolean()
    recommend: boolean
}