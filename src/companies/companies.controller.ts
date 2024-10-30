import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CompaniesService } from "./companies.service";
import { CreateCompanyDto } from "./dto/CreateCompany.dto";
import mongoose from "mongoose";
import { UpdateCompanyDto } from "./dto/UpdateCompany.dto";

@Controller('companies')
export class CompaniesController {
    constructor(private companiesService: CompaniesService) {}
    @Post('signup')
    @UsePipes(new ValidationPipe())
    async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
        return await this.companiesService.createCompany(createCompanyDto)
    }

    @Get()
    getCompanies() {
        return this.companiesService.getCompanies()
    }

    @Get(':id')
    async getCompanyById(@Param('id') id:string) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid) {
            throw new HttpException('Company not found', 404)
        }
        const findCompany = await this.companiesService.getCompanyById(id)
        if(!findCompany) {
            throw new HttpException('Company not found', 404)
        }
        return findCompany
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateCompany(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid) {
            throw new HttpException('Invalid ID', 400)
        }
        const updatedCompany = await this.companiesService.updateCompany(id, updateCompanyDto)
        if(!updatedCompany) {
            throw new HttpException('Company not found', 404)
        }
        return updatedCompany
    }

    @Delete(':id')
    async deleteCompany(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid) {
            throw new HttpException('Invalid ID', 400)
        }
        const deletedCompany = await this.companiesService.deleteCompany(id)
        if(!deletedCompany) {
            throw new HttpException('Company not found', 404)
        }
        return deletedCompany
    }
}