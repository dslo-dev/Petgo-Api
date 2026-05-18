import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Profile } from './profile.entity';
import { Role } from './role.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'user_name' })
	username!: string;

	@Column({ type: 'varchar', length: '100', nullable: false, unique: true })
	email!: string;

	@Column({ type: 'varchar', length: '80', nullable: false })
	password!: string;

	@OneToOne(() => Profile, { cascade: true })
	@JoinColumn()
	profile!: Profile;

	@ManyToMany(() => Role, (role) => role.users, { cascade: false })
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
