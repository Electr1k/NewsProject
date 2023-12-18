import { Injectable } from '@nestjs/common';
import {CreateReactionDto} from "./dto/CreateReactionDto";
import {Reactions} from "./reactions.model";
import {InjectModel} from "@nestjs/sequelize";
import {NewsReactions} from "./news-reactions.model";

@Injectable()
export class ReactionsService {

    constructor(
        @InjectModel(Reactions) private reactionRepository: typeof Reactions,
        @InjectModel(NewsReactions) private reactionOnNews: typeof NewsReactions
    ) {}

    async createReaction(dto: CreateReactionDto){
        const reaction = await this.reactionRepository.create(dto);
        return reaction;
    }

    async getAllReaction(){
        const reactions = await this.reactionRepository.findAll({include: {all: true}});
        return reactions;
    }

    async getReactionById(id: number){
        const reaction = await this.reactionRepository.findByPk(id, { include: {all: true} })
        return reaction
    }

    async updateReaction(dto: CreateReactionDto, id: number){
        const reaction = await this.reactionRepository.update(dto, {where: {id: id}})
        return reaction
    }

    async deleteReaction(id: number){
        const reaction = await this.reactionRepository.destroy({where: {id: id}})
        return reaction
    }

    async findReactionsOnNewsById(idReactions: number, idNews: number){
        const reaction = await this.reactionOnNews.findOne({
            where: {newsId: idNews, reactionId: idReactions},
            include: {all: true}
        })
        return reaction
    }

    async createReactionOnNews(newsId: number, userId: number, reactionId: number) {
        const reaction = await this.reactionOnNews.create({
            newsId: newsId,
            userId: userId,
            reactionId: reactionId,
        });
        return reaction;
    }
    async getReactionOnNews(){
        const re = await this.reactionOnNews.findAll({include: {all: true}})
        return re
    }
}
