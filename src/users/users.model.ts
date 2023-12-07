import {Column, DataType, Model, Table} from "sequelize-typescript";

interface UserCreationAttrs{
    email: string;
    password: string;
    role: number
}

@Table({tableName: 'users'})
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
}