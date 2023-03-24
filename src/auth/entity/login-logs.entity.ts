import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/users/entities/users.entity";
import { EntityHelper } from "src/utils/entity-helper";

@Entity()
export class LoginLog extends EntityHelper {
    @Column()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    refreshToken: string;

    @Column()
    accessToken: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    isValidate: boolean
}