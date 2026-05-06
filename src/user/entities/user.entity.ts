import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Profile } from '../profile/entities/profile.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'user_name' })
	userName!: string;

	@Column({ type: 'varchar', length: '100', nullable: false, unique: true })
	email!: string;

	@Column({ type: 'varchar', length: '80', nullable: false })
	password!: string;

	@OneToOne(() => Profile)
	profile!: Profile;
}
