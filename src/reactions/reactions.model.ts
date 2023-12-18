import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";


interface ReactionsCreationAttrs{
    value: string;
}

@Table({tableName: 'reactions'})
export class Reactions extends Model<Reactions, ReactionsCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;
}