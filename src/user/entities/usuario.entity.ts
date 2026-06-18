import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn,
	ManyToMany,
	JoinTable,
	CreateDateColumn,
	DeleteDateColumn,
} from 'typeorm';
import { Perfil } from './perfil.entity';
import { Rol } from './rol.entity';

@Entity()
export class Usuario {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'nombre_usuario' })
	nombreUsuario!: string;

	@Column({ name: 'email_usuario', type: 'varchar', length: '100', nullable: false, unique: true })
	email!: string;

	@Column({ name: 'constraseña_usuario', type: 'varchar', length: '80', nullable: false })
	contraseña!: string;

	@CreateDateColumn({ name: 'creacion_usuario', default: () => 'CURRENT_TIMESTAMP' })
	creacion!: Date;

	@DeleteDateColumn({ name: 'eliminacion_usuario', nullable: true })
	eliminacion!: Date;

	@Column({ name: 'activo', default: true })
	isActive!: boolean;

	// Relaciones
	@OneToOne(() => Perfil, { cascade: true })
	@JoinColumn({ name: 'fk_perfil' })
	perfil!: Perfil;

	@ManyToMany(() => Rol, (role) => role.usuarios, { cascade: false })
	@JoinTable({
		name: 'perfil_rol',
		joinColumn: {
			name: 'perfil_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'role_id',
			referencedColumnName: 'id',
		},
	})
	roles!: Rol[];
}
