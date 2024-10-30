import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/User.schema";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { CommentSchema, Comment } from "src/schemas/Comment.schema";

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
            }   
        ])
        ],
        providers: [
            UsersService
        ],
        controllers: [
            UsersController
        ]
    })
export class UsersModule {}