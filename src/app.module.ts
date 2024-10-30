import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://kogabay21:Dosik210904@comment-service.thodj.mongodb.net/'),
    UsersModule,
    CommentsModule,
    CompaniesModule,
    AuthModule
  ],
})
export class AppModule {}