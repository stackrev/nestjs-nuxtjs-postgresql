import {
    Entity,
    Column,
    BaseEntity,
    BeforeUpdate,
    ManyToOne,
    JoinColumn,
    BeforeInsert,
    PrimaryGeneratedColumn
} from 'typeorm';
import {User} from '../../users/entities/users.entity';

@Entity('codes')
export class Code extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar'})
    user_id: string;

    @Column({type: 'varchar', nullable: true})
    type: string;

    @Column({type: 'varchar'})
    code: string;

    @Column({type: 'varchar'})
    hash: string;

    @Column({type: 'varchar'})
    ip: string;

    @Column({type: 'smallint', default: 1})
    status: number;

    @Column({type: 'timestamp', nullable: true})
    expired_at: Date;

    @Column({type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date;

    /////////////////////////// /////////////////////////// ///////////////////////////

    @ManyToOne(type => User, user => user.code)
    @JoinColumn({name: 'user_id'})
    user: Promise<User>;

    /////////////////////////// /////////////////////////// ///////////////////////////

    @BeforeInsert()
    beforeInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    @BeforeUpdate()
    updateDate() {
        this.updated_at = new Date();
    }
}
