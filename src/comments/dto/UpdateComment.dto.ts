import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateCommentDto {
    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsNumber()
    rating: number

    @IsOptional()
    @IsBoolean()
    isCurrent: boolean
    
    @IsOptional()
    @IsString()
    jobTitle: string
    
    @IsOptional()
    @IsBoolean()
    recommend: boolean
}