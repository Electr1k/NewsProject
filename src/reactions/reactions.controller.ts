import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ReactionsService} from "./reactions.service";
import {CreateReactionDto} from "./dto/CreateReactionDto";

@Controller('reactions')
export class ReactionsController {

    constructor(private reactionService: ReactionsService) {}

    @Post()
    create(@Body() dto: CreateReactionDto){
        return this.reactionService.createReaction(dto);
    }

    @Get()
    getAll(){
        return this.reactionService.getAllReaction();
    }

    @Post("/:id/update")
    update(@Body() dto: CreateReactionDto, @Param('id') id: number){
        return this.reactionService.updateReaction(dto, id)
    }

    @Delete(':id')
    delete(@Param('id') id: number){
        return this.reactionService.deleteReaction(id)
    }

    @Get('/a')
    getR(){
        return this.reactionService.getReactionOnNews()
    }
}
