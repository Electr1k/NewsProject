import {Column, DataType, Model, Table} from "sequelize-typescript";

interface NewsCreationAttrs{

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

    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: null})
    creator: number;
}