import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Company, CompanySchema } from "src/schemas/Company.schema";
import { InterviewsController } from "./interviews.controller";
import { Interview, InterviewSchema } from "src/schemas/Interview.schema";
import { User, UserSchema } from "src/schemas/User.schema";
import { InterviewsService } from "./interviews.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            },
            {
                name: Company.name,
                schema: CompanySchema
            },
            {
                name: Interview.name,
                schema: InterviewSchema
            }
        ])
        ],
        providers: [
            InterviewsService
        ],
        controllers: [
            InterviewsController
        ]
    })
export class InterviewsModule {}