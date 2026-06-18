import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { MiembroGrupo } from './miembro-grupo.entity';
import { Invitacion } from './invitacion.entity';
import { Estado } from '../../common/Enums';

@Entity('grupos_familiares')
export class GrupoFamiliar {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ length: 150 })
	nombre!: string;

	@Column('uuid')
	propietarioId!: string;

	@Column('uuid')
	creadoPor!: string;

	@Column({
		type: 'text',
		nullable: true,
	})
	descripcion?: string;

	@Column({
		nullable: true,
	})
	urlImagen?: string;

	@CreateDateColumn()
	fechaCreacion!: Date;

	@Column({ type: 'timestamp', nullable: true })
	fechaEliminacion?: Date;

	@UpdateDateColumn()
	fechaActualizacion!: Date;

	@Column({ type: 'enum', enum: Estado, default: Estado.ACTIVO })
	estado!: Estado;

	@OneToMany(() => MiembroGrupo, (miembro) => miembro.grupo)
	miembros!: MiembroGrupo[];

	@OneToMany(() => Invitacion, (invitacion) => invitacion.grupo)
	invitaciones!: Invitacion[];
}
