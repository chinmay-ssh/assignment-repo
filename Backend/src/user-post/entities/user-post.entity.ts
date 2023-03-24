import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { User } from 'src/users/entities/users.entity';

@Entity()
export class UserPost extends EntityHelper {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, unique: true })
    title: string;

    @ManyToOne(() => User, (user) => user.userPosts)
    user: User

    @OneToMany(() => UserPost, (userPost) => userPost.user)
    userPost: UserPost[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}
