import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CreateUserDto} from "./dto/CreateUserDto";
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}


    @Get()
    getAll(){
        return this.usersService.getAllUsers()
    }

    @Post('setRole/:id/:role')
    setRole(@Param('id') id: number, @Param('role') role: number){
        return this.usersService.setRoleUser(id, role)
    }

    @Post('/update/:id')
    updateUser(@Param('id') id: number, @Body() dto: CreateUserDto){
        return this.usersService.updateUser(id, dto);
    }

    @Get('/:id')
    getUserById(@Param('id') id: number){
        return this.usersService.getUserById(id);
    }
}
