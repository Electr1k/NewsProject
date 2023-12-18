import { Module } from '@nestjs/common';
import { ReactionsController } from './reactions.controller';
import { ReactionsService } from './reactions.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Reactions} from "./reactions.model";
import {News} from "../news/news.model";
import {NewsReactions} from "./news-reactions.model";

@Module({
  providers: [ReactionsService],
  controllers: [ReactionsController],
  imports: [SequelizeModule.forFeature(
      [Reactions, News, NewsReactions])],
  exports: [
      ReactionsService
  ]
})
export class ReactionsModule {}
