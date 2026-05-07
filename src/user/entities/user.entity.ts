import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Profile } from '../profile/entities/profile.entity';

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
}
