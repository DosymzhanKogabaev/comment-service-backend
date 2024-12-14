import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from 'src/schemas/Comment.schema';
import { CreateCommentDto } from './dto/CreateComment.dto';
import { UpdateCommentDto } from './dto/UpdateComment.dto';
import { User } from 'src/schemas/User.schema';
import { Company } from 'src/schemas/Company.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async createComment(createCommentDto: CreateCommentDto) {
    const findAuthor = await this.userModel.findById(createCommentDto.authorId) || await this.companyModel.findById(createCommentDto.authorId)
    const findTo = await this.userModel.findById(createCommentDto.toId) || await this.companyModel.findById(createCommentDto.toId)
    if (!findAuthor) {
      throw new HttpException('Author not found', 404);
    }

    if (!findTo) {
      throw new HttpException('To not found', 404);
    }

    try {
        const newComment = new this.commentModel(createCommentDto);
        const savedComment = await newComment.save();
    
        await findTo.updateOne({ $push: { comments: savedComment._id } });
    
        // Calculate and update the new average rating
        await this.updateRating(findTo);
    
        return savedComment;
      } catch (error) {
        console.error('Error creating comment:', error);
        throw new HttpException('Internal Server Error', 500);
      }
  }

  getComments() {
    return this.commentModel.find();
  }

  getCommentById(id: string) {
    return this.commentModel.findById(id);
  }

  updateComment(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentModel.findByIdAndUpdate(id, updateCommentDto, {
      new: true,
    });
  }

  deleteComment(id: string) {
    return this.commentModel.findByIdAndDelete(id);
  }

  private async updateRating(entity: any): Promise<void> {
    // Populate the comments to access their ratings
    const populatedEntity = await entity.model(entity.constructor.modelName).findById(entity._id).populate('comments').populate('salaries').populate('interviews');
  
    // Extract ratings from the comments
    const comments = populatedEntity.comments;
    const totalRating = comments.reduce((acc: number, comment: any) => acc + comment.rating, 0);
    const averageRating = comments.length ? totalRating / comments.length : 0;
  
    // Update the entity's rating in the database
    await entity.updateOne({ rating: averageRating });
  }  
}
