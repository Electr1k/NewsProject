import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {News} from "./news.model";
import {User} from "../users/users.model";
import {FilesModule} from "../files/files.module";
import {Reactions} from "../reactions/reactions.model";
import {NewsReactions} from "../reactions/news-reactions.model";
import {ReactionsModule} from "../reactions/reactions.module";

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [
    SequelizeModule.forFeature(
        [User, News, Reactions, NewsReactions]),
    FilesModule,
    ReactionsModule
  ],
  exports: [NewsService]
})
export class NewsModule {}