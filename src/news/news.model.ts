import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";

interface NewsCreationAttrs{
    title: string;
    description: string;
    userId: number;
    image: string;
}

@Table({tableName: 'news'})
export class News extends Model<News, NewsCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    image: string;

    @ForeignKey( () => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo( () => User)
    creator: User
}