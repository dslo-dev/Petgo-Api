import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class Role {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'role_name', type: 'varchar', length: 50, nullable: false })
	roleName!: string;

	@ManyToMany(() => Profile, (profile) => profile.roles)
	profiles!: Profile;
}
