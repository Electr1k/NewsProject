import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {News} from "../news/news.model";
import {Reactions} from "./reactions.model";
import {User} from "../users/users.model";


@Table({tableName: 'news_reactions', createdAt: false, updatedAt: false})
export class NewsReactions extends Model<NewsReactions>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
    id: number;

    @ForeignKey(() => Reactions)
    @Column({type: DataType.INTEGER, allowNull: false})
    reactionId: number;

    @ForeignKey(() => News)
    @Column({type: DataType.INTEGER, allowNull: false})
    newsId: number;

    @BelongsTo(() => News, 'userId')
    news: News;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @BelongsTo(() => User, 'userId')
    user: User;

    @BelongsTo(() => Reactions, 'reactionId')
    reaction: Reactions;
}