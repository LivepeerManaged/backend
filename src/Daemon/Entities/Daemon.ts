import {Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../User/Entities/User";

@Entity()
export class Daemon {
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

    @ManyToOne(() => User, user => user.daemons)
    public user: User;
}