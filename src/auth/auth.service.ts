import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/CreateUserDto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService) {}

    async login(userDto: CreateUserDto){
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user);
    }

    private async generateToken(user: User){
        const payload = {email: user.email, id: user.id, role: user.role}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto){
        try{
            const user = await this.userService.getUserByEmail(userDto.email, 'withPassword');
            console.log(userDto.password)
            console.log(user.password)
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            console.log(passwordEquals)
            if (user && passwordEquals){
                return user;
            }
            throw new UnauthorizedException({
                message: 'Invalid email or password'
            })
        }
        catch (e){
            throw new UnauthorizedException({
                message: 'Invalid email or password'
            })
        }
    }


}
