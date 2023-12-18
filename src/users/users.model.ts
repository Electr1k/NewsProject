import {BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {News} from "../news/news.model";
import {NewsReactions} from "../reactions/news-reactions.model";

interface UserCreationAttrs{
    email: string;
    password: string;
    role: number
}

@Table({tableName: 'users', defaultScope: {  attributes: { exclude: ['password'] }}, scopes: {
        withPassword: {}
    }}
)
export class User extends Model<User, UserCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
    id: number;

    @Column({type: DataType.SMALLINT, defaultValue: 0})
    role: number;

    @Column({type: DataType.STRING, unique: true, allowNull: null})
    email: string;

    @Column({type: DataType.STRING, allowNull: null})
    password: string;

    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    image: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @HasMany( () => News)
    createdNews: News[];

    @HasMany(() => NewsReactions)
    reactions: NewsReactions[];
}