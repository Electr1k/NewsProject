import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as path from  'path'
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { FilesModule } from './files/files.module';
import {News} from "./news/news.model";
import {ServeStaticModule} from "@nestjs/serve-static";
import { ReactionsModule } from './reactions/reactions.module';
import {Reactions} from "./reactions/reactions.model";
import {NewsReactions} from "./reactions/news-reactions.model";
@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: '.' + process.env.NODE_ENV + '.env'
      }),
      ServeStaticModule.forRoot({
          rootPath: path.resolve(__dirname, 'static'),
      }),
      SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          models: [User, News, Reactions, NewsReactions],
          autoLoadModels: true
      }),
      UsersModule,
      AuthModule,
      NewsModule,
      FilesModule,
      ReactionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
