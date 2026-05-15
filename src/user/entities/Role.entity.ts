import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'role_name', type: 'varchar', length: 50, default: 'owner', nullable: false })
	roleName!: string;
}
