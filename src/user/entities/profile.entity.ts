import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	DeleteDateColumn,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class Profile {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	avatar!: string;

	@Column({ type: 'varchar', length: '100', nullable: false })
	name!: string;

	@Column({ type: 'varchar', length: '100', nullable: false })
	lastname!: string;

	@CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
	createdAt!: Date;

	@DeleteDateColumn({ name: 'deleted_at', nullable: true })
	deletedAt!: Date;

	@Column({ name: 'active', default: true })
	isActive!: boolean;

	@ManyToMany(() => Role, (role) => role.profiles, { cascade: false })
	@JoinTable({
		name: 'profile_roles',
		joinColumn: {
			name: 'profile_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'role_id',
			referencedColumnName: 'id',
		},
	})
	roles!: Role[];
}
