import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/User.schema";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { CommentSchema, Comment } from "src/schemas/Comment.schema";
import { Company, CompanySchema } from "src/schemas/Company.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            },
            {
                name: Comment.name,
                schema: CommentSchema
            },
            {
                name: Company.name,
                schema: CompanySchema
            }
        ])
    ],
    providers: [
        CommentsService
    ],
    controllers: [
        CommentsController
    ]
})
export class CommentsModule {}