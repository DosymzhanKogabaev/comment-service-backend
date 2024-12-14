import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Company } from "src/schemas/Company.schema";
import { Comment } from "src/schemas/Comment.schema";
import { CreateCompanyDto } from "./dto/CreateCompany.dto";
import { UpdateCompanyDto } from "./dto/UpdateCompany.dto";
import { encodePassword } from "src/utils/bcrypt";

@Injectable()
export class CompaniesService {
    constructor(@InjectModel(Company.name) private companyModel: Model<Company>) {}
    
    async createCompany(createCompanyDto: CreateCompanyDto) {
        if((await this.companyModel.findOne({ companyName: createCompanyDto.companyName })))
            throw new HttpException('Company already exist', 409);

        const password = encodePassword(createCompanyDto.password)
        const newCompany = new this.companyModel({...createCompanyDto, password})
        return newCompany.save()
    }

    getCompanies() {
        return this.companyModel.find().populate('comments').populate('salaries').populate('interviews')
    }

    getCompanyById(id: string) {
        return this.companyModel.findById(id).populate('comments').populate('salaries').populate('interviews')
    }

    updateCompany(id: string, updateCompanyDto: UpdateCompanyDto) {
        if(updateCompanyDto.password) {
            updateCompanyDto.password = encodePassword(updateCompanyDto.password)
        }
        return this.companyModel.findByIdAndUpdate(id, updateCompanyDto, { new: true })
    }

    deleteCompany(id: string) {
        return this.companyModel.findByIdAndDelete(id)
    }
}