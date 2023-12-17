import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {News} from "./news.model";
import {User} from "../users/users.model";
import {FilesModule} from "../files/files.module";

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [
    SequelizeModule.forFeature(
        [User, News]),
    FilesModule
  ],
  exports: [NewsService]
})
export class NewsModule {}