import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail} from "class-validator";
import {Daemon} from "../../Daemon/Entities/Daemon";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsEmail()
    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Daemon, daemon => daemon.user, {eager: true})
    daemons: Array<Daemon>;
}