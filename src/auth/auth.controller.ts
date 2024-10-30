import { Body, Request, Controller, Get, HttpException, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuardUser } from './authUser.guard';
import { SignInUserDto } from './dto/SignInUser.dto';
import { SignInCompanyDto } from './dto/SignInCompany.dto';
import { AuthGuardCompany } from './authCompany.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login-user')
    signInUser(@Body() signInDto: SignInUserDto) {
        return this.authService.signInUser(signInDto);
    }

    @UseGuards(AuthGuardUser)
    @Get('profile-user')
    getUserProfile(@Request() req) {
        return this.authService.getUserProfile(req);
    }
    
    @Post('login-company')
    signInCompany(@Body() signInDto: SignInCompanyDto) {
        return this.authService.signInCompany(signInDto);
    }

    @UseGuards(AuthGuardCompany)
    @Get('profile-company')
    getCompanyProfile(@Request() req) {
        return this.authService.getCompanyProfile(req);
    }
}
