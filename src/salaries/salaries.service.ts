import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from 'src/schemas/Company.schema';
import { CreateSalaryDto } from './dto/CreateSalary.dto';
import { UpdateSalaryDto } from './dto/UpdateSalary.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { Salary } from 'src/schemas/Salary.schema';

@Injectable()
export class SalariesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
    @InjectModel(Salary.name) private salaryModel: Model<Salary>,
  ) {}

  async createSalary(createSalaryDto: CreateSalaryDto) {
    const findCompany = await this.companyModel.findById(
      createSalaryDto.companyId,
    );
    if (!findCompany) {
      throw new HttpException('Company not found', 404);
    }
    if (
      await this.salaryModel.findOne({
        vacancy: createSalaryDto.vacancy,
        companyId: createSalaryDto.companyId,
      })
    )
      throw new HttpException('Salary already exist', 409);

    try {
      const newSalary = new this.salaryModel(createSalaryDto);
      const savedSalary = await newSalary.save();

      await findCompany.updateOne({ $push: { salaries: savedSalary._id } });

      return savedSalary;
    } catch (error) {
      console.error('Error creating salary:', error);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  getSalaries() {
    return this.salaryModel.find();
  }

  getSalaryById(id: string) {
    return this.salaryModel.findById(id);
  }

  updateSalary(id: string, updateSalaryDto: UpdateSalaryDto) {
    return this.salaryModel.findByIdAndUpdate(id, updateSalaryDto, {
      new: true,
    });
  }

  deleteSalary(id: string) {
    return this.salaryModel.findByIdAndDelete(id);
  }
}
