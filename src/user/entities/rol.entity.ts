import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class Rol {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'nombre_rol', type: 'varchar', length: 50, nullable: false })
	nombreRol!: string;

	@ManyToMany(() => Usuario, (usuario) => usuario.roles)
	usuarios!: Usuario;
}
