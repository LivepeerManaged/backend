import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class DaemonEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({length: 360, unique: true})
    public publicKey: string;

    @Column()
    public daemonSecret: string;

    @Column({default: 'Daemon'})
    public label: string;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: Date;

    @Column({default: false})
    public activated: boolean;
}