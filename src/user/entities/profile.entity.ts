import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, OneToOne } from 'typeorm';
import { Role } from './Role.entity';

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

	@OneToOne(() => Role, { cascade: true })
	role!: Role;
}
