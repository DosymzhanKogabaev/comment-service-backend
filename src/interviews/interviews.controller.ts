import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateInterviewDto } from "./dto/CreateInterview.dto";
import mongoose from "mongoose";
import { UpdateInterviewDto } from "./dto/UpdateInterview.dto";
import { InterviewsService } from "./interviews.service";

@Controller('interviews')
export class InterviewsController {
    constructor(private interviewsService: InterviewsService) {}
    @Post()
    @UsePipes(new ValidationPipe())
    async createInterview(@Body() createInterviewDto: CreateInterviewDto) {
        return await this.interviewsService.createInterview(createInterviewDto)
    }

    @Get()
    getInterviews() {
        return this.interviewsService.getInterviews()
    }

    @Get(':id')
    async getInterviewById(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid) {
            throw new HttpException('Interview not found', 404)
        }
        const findInterview = await this.interviewsService.getInterviewById(id)
        if(!findInterview) {
            throw new HttpException('Interview not found', 404)
        }
        return findInterview
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateInterview(@Param('id') id: string, @Body() updateInterviewDto: UpdateInterviewDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid) {
            throw new HttpException('Invalid ID', 400)
        }
        const updatedInterview = await this.interviewsService.updateInterview(id, updateInterviewDto)
        if(!updatedInterview) {
            throw new HttpException('Interview not found', 404)
        }
        return updatedInterview
    }

    @Delete(':id')
    async deleteInterview(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid) {
            throw new HttpException('Invalid ID', 400)
        }
        const deletedInterview = await this.interviewsService.deleteInterview(id)
        if(!deletedInterview) {
            throw new HttpException('Interview not found', 404)
        }
        return deletedInterview
    }
}