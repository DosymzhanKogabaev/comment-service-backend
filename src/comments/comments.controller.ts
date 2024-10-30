import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/CreateComment.dto";
import mongoose from "mongoose";
import { UpdateCommentDto } from "./dto/UpdateComment.dto";

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}
    @Post()
    @UsePipes(new ValidationPipe())
    createComment(@Body() createcommentDto: CreateCommentDto) {
        return this.commentsService.createComment(createcommentDto)
    }

    @Get()
    getComments() {
        return this.commentsService.getComments()
    }

    @Get(':id')
    async getCommentById(@Param('id') id:string) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid) {
            throw new HttpException('Comment not found', 404)
        }
        const findComment = await this.commentsService.getCommentById(id)
        if(!findComment) {
            throw new HttpException('Comment not found', 404)
        }
        return findComment
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateComment(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid) {
            throw new HttpException('Invalid ID', 400)
        }
        const updatedComment = await this.commentsService.updateComment(id, updateCommentDto)
        if(!updatedComment) {
            throw new HttpException('Comment not found', 404)
        }
        return updatedComment
    }

    @Delete(':id')
    async deleteComment(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid) {
            throw new HttpException('Invalid ID', 400)
        }
        const deletedComment = await this.commentsService.deleteComment(id)
        if(!deletedComment) {
            throw new HttpException('Comment not found', 404)
        }
        return deletedComment
    }
}