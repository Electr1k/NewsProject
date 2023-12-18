import {Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {NewsService} from "./news.service";
import {CreateNewsDto} from "./dto/CreateNewsDto";
import {FilesService} from "../files/files.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {SetReactionDto} from "../reactions/dto/SetReactionDto";
import {CreateReactionDto} from "../reactions/dto/CreateReactionDto";
import {CreateReactionOnNewsDto} from "../reactions/dto/CreateReactionOnNewsDto";

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() newsDto: CreateNewsDto,
           @UploadedFile() image){
        return this.newsService.createNews(newsDto, image);
    }

    @Get()
    getAll(){
        return this.newsService.getAllNews();
    }

    @Get('/:id')
    getNewsById(@Param('id') id: number){
        return this.newsService.getNewsById(id);
    }

    @Delete('/:id')
    deleteNewsById(@Param('id') id: number){
        return this.newsService.deleteNewsById(id);
    }

    @Post('/update/:id')
    updateNews(@Param('id') id: number, @Body() newsDto : CreateNewsDto): Promise<boolean>{
        console.log(newsDto.title)
        return this.newsService.updateNews(id, newsDto);
    }

    @Post("/reaction")
    setReaction(@Body() dto: CreateReactionOnNewsDto){
        return this.newsService.setReactionOnNews(dto);
    }
}
