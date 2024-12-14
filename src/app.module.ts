import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';
import { SalariesModule } from './salaries/salaries.module';
import { InterviewsModule } from './interviews/interviews.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://kogabay21:Dosik210904@comment-service.thodj.mongodb.net/'),
    UsersModule,
    CommentsModule,
    CompaniesModule,
    AuthModule,
    SalariesModule,
    InterviewsModule
  ],
})
export class AppModule {}