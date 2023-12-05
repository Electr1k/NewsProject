import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CreateUserDto} from "./dto/CreateUserDto";
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}


    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.usersService.createUser(userDto);
    }

    @Get()
    getAll(){
        return this.usersService.getAllUsers()
    }

    @Post('setRole/:id/:role')
    setRole(@Param('id') id: number, @Param('role') role: number){
        return this.usersService.setRoleUser(id, role)
    }
}
