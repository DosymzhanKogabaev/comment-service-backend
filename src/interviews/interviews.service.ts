import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInterviewDto } from './dto/CreateInterview.dto';
import { UpdateInterviewDto } from './dto/UpdateInterview.dto';
import { User } from 'src/schemas/User.schema';
import { Company } from 'src/schemas/Company.schema';
import { Interview } from 'src/schemas/Interview.schema';

@Injectable()
export class InterviewsService {
  constructor(
    @InjectModel(Interview.name) private interviewModel: Model<Interview>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async createInterview(createInterviewDto: CreateInterviewDto) {
    const findAuthor = await this.userModel.findById(createInterviewDto.userId)
    const findTo = await this.companyModel.findById(createInterviewDto.companyId)
    if (!findAuthor) {
      throw new HttpException('Author not found', 404);
    }

    if (!findTo) {
      throw new HttpException('To not found', 404);
    }

    try {
        const newInterview = new this.interviewModel(createInterviewDto);
        const savedInterview = await newInterview.save();
    
        await findTo.updateOne({ $push: { interviews: savedInterview._id } });
    
        return savedInterview;
      } catch (error) {
        console.error('Error creating interview:', error);
        throw new HttpException('Internal Server Error', 500);
      }
  }

  getInterviews() {
    return this.interviewModel.find();
  }

  getInterviewById(id: string) {
    return this.interviewModel.findById(id);
  }

  updateInterview(id: string, updateInterviewDto: UpdateInterviewDto) {
    return this.interviewModel.findByIdAndUpdate(id, updateInterviewDto, {
      new: true,
    });
  }

  deleteInterview(id: string) {
    return this.interviewModel.findByIdAndDelete(id);
  }
}
