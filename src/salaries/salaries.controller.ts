import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateSalaryDto } from "./dto/CreateSalary.dto";
import mongoose from "mongoose";
import { UpdateSalaryDto } from "./dto/UpdateSalary.dto";
import { SalariesService } from "./salaries.service";

@Controller('salaries')
export class SalariesController {
    constructor(private salariesService: SalariesService) {}
    @Post()
    @UsePipes(new ValidationPipe())
    async createSalary(@Body() createSalaryDto: CreateSalaryDto) {
        return await this.salariesService.createSalary(createSalaryDto)
    }

    @Get()
    getCompanies() {
        return this.salariesService.getSalaries()
    }

    @Get(':id')
    async getSalaryById(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid) {
            throw new HttpException('Salary not found', 404)
        }
        const findSalary = await this.salariesService.getSalaryById(id)
        if(!findSalary) {
            throw new HttpException('Salary not found', 404)
        }
        return findSalary
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateSalary(@Param('id') id: string, @Body() updateSalaryDto: UpdateSalaryDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid) {
            throw new HttpException('Invalid ID', 400)
        }
        const updatedSalary = await this.salariesService.updateSalary(id, updateSalaryDto)
        if(!updatedSalary) {
            throw new HttpException('Salary not found', 404)
        }
        return updatedSalary
    }

    @Delete(':id')
    async deleteSalary(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid) {
            throw new HttpException('Invalid ID', 400)
        }
        const deletedSalary = await this.salariesService.deleteSalary(id)
        if(!deletedSalary) {
            throw new HttpException('Salary not found', 404)
        }
        return deletedSalary
    }
}