import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { encodePassword } from "src/utils/bcrypt";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    
    async createUser(createUserDto: CreateUserDto) {
        if(await this.userModel.findOne({ username: createUserDto.username }))
            throw new HttpException('User already exist', 409);

        const password = encodePassword(createUserDto.password)
        const newUser = new this.userModel({...createUserDto, password})
        return newUser.save()
    }

    getUsers() {
        return this.userModel.find().populate('comments')
    }

    getUserById(id: string) {
        return this.userModel.findById(id).populate('comments')
    }

    updateUser(id: string, updateUserDto: UpdateUserDto) {
        updateUserDto.password = encodePassword(updateUserDto.password)
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true })
    }

    deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id)
    } 

    async findOne(username: string): Promise<User | undefined> {
        return this.userModel.findOne({ username: username });
    }
}