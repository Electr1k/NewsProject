import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {NewsService} from "./news.service";
import {CreateNewsDto} from "./dto/CreateNewsDto";

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService) {}

    @Post()
    create(@Body() newsDto: CreateNewsDto){
        return this.newsService.createNews(newsDto);
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
        return this.newsService.updateNews(id, newsDto);
    }
}
