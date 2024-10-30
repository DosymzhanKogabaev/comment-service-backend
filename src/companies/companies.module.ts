import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Company, CompanySchema } from "src/schemas/Company.schema";
import { CompaniesService } from "./companies.service";
import { CompaniesController } from "./companies.controller";
import { CommentSchema, Comment } from "src/schemas/Comment.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Company.name,
                schema: CompanySchema
            },
            {
                name: Comment.name,
                schema: CommentSchema
            }   
        ])
        ],
        providers: [
            CompaniesService
        ],
        controllers: [
            CompaniesController
        ]
    })
export class CompaniesModule {}