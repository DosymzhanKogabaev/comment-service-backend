import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Company, CompanySchema } from "src/schemas/Company.schema";
import { SalariesController } from "./salaries.controller";
import { SalariesService } from "./salaries.service";
import { Salary, SalarySchema } from "src/schemas/Salary.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Company.name,
                schema: CompanySchema
            },
            {
                name: Salary.name,
                schema: SalarySchema
            }
        ])
        ],
        providers: [
            SalariesService
        ],
        controllers: [
            SalariesController
        ]
    })
export class SalariesModule {}