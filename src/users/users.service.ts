import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/CreateUserDto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {
    }

    async createUser(dto: CreateUserDto){
        const user = await this.userRepository.create(dto)
        return user
    }

    async getAllUsers(){
        const users = await this.userRepository.findAll({
            attributes: { exclude: ['password'] },
        })
        return users
    }

    async setRoleUser(id: number, role: number): Promise<boolean>{
        try {
            const updatedUser = await this.userRepository.update(
                {role: role},
                {where: {id: id}}
            );
            return !!updatedUser[0];
        }
        catch (e){
            console.log(e);
            return false;
        }
    }

    async getUserByEmail(email: string){
        const user = await this.userRepository.findOne({
            where : {email: email},
            attributes: { exclude: ['password'] },
        });
        user.password = undefined;
        return user;
    }

    async updateUser(id: number, dto: CreateUserDto){
        dto.password = undefined;
        const success = await this.userRepository.update(dto, {where: {id: id}});
        return Boolean(success[0]);
    }

    async getUserById(id: number){
        const user = await this.userRepository.findByPk(id,{
            attributes: { exclude: ['password'] },
        });
        user.password = undefined;
        return user;
    }
}
