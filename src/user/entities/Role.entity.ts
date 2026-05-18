import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'role_name', type: 'varchar', length: 50, nullable: false })
	roleName!: string;

	@ManyToMany(() => User, (user) => user.roles)
	users!: User;
}
