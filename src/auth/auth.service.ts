import { Request, Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { SignInUserDto } from './dto/SignInUser.dto';
import { comparePasswords } from 'src/utils/bcrypt';
import { Company } from 'src/schemas/Company.schema';
import { SignInCompanyDto } from './dto/SignInCompany.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>, 
        @InjectModel(Company.name) private companyModel: Model<Company>, 
        private jwtService : JwtService
    ) {}
    
    async signInUser(signInDto: SignInUserDto) {
        const user = await this.userModel.findOne({ username: signInDto.username });
        if(!user) {
            throw new HttpException("Username not found!", 404);
        }
        const match = comparePasswords(signInDto.password, user.password)
        if (!match) {
            throw new HttpException("Wrong password!", 401);
        }
        const payload = { sub: user._id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async getUserProfile(@Request() req) {
        return await this.userModel.findById(req.user.sub)
    }
    
    async signInCompany(signInDto: SignInCompanyDto) {
        const company = await this.companyModel.findOne({ companyName: signInDto.companyName });
        if(!company) {
            throw new HttpException("Company not found!", 404);
        }
        const match = comparePasswords(signInDto.password, company.password)
        if (!match) {
            throw new HttpException("Wrong password!", 401);
        }
        const payload = { sub: company._id, companyName: company.companyName };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async getCompanyProfile(@Request() req) {
        return await this.companyModel.findById(req.company.sub)
    }
}
