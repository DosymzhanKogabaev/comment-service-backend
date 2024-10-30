import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { Company, CompanySchema } from 'src/schemas/Company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
          name: User.name,
          schema: UserSchema
      },
      {
          name: Company.name,
          schema: CompanySchema
      },
    ]),
    JwtModule.register({
      secret: 'I love cats',
      signOptions: { expiresIn: '1h' }
    })
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
