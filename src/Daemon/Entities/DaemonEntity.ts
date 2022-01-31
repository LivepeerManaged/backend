import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class DaemonEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column("text")
    public publicKey: string;

    @Column()
    public daemonSecret: string;

    @Column()
    public label: string;

    @Column()
    public createdAt: Date;

    @Column()
    public activated: boolean;
}