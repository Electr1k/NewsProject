import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {News} from "./news.model";
import {CreateNewsDto} from "./dto/CreateNewsDto";
import {FilesService} from "../files/files.service";

@Injectable()
export class NewsService {

    constructor(@InjectModel(News) private newsRepository: typeof News,
                private fileService: FilesService) {}


    async createNews(dto: CreateNewsDto, image: any){
        const fileName = await this.fileService.createFile(image)
        const news = await this.newsRepository.create({...dto, image: fileName})
        return news
    }

    async getAllNews(){
        const news = await this.newsRepository.findAll()
        return news
    }

    async getNewsById(id: number){
        const news = await this.newsRepository.findByPk(id)
        if (!news){
            throw new HttpException('News not found', HttpStatus.NOT_FOUND);
        }
        return news
    }

    async deleteNewsById(id: number){
        await this.newsRepository.destroy({where: {id: id}});
    }

    async updateNews(id: number, dto: CreateNewsDto): Promise<boolean>{
        const news = await this.newsRepository.update(dto, {where: {id: id}})
        return Boolean(news[0])
    }
}