import {
    Entity,
    Column,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn
} from 'typeorm';
import {User} from '../../users/entities/users.entity';

@Entity('refresh_tokens')
export class RefreshToken extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar'})
    user_id: string;

    @Column({type: 'varchar', nullable: true})
    client_id: string;

    @Column({type: 'varchar', nullable: true})
    ip_address: string;

    @Column({type: 'text'})
    value: string;

    @Column({type: 'timestamp'})
    expires_at: Date;

    /////////////////////////// /////////////////////////// ///////////////////////////

    @ManyToOne(type => User, user => user.tokens)
    @JoinColumn({name: 'user_id'})
    user: Promise<User>;

}
