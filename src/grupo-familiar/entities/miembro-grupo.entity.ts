import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { GrupoFamiliar } from './grupo-familiar.entity';
import { Estado, Rol } from '../../common/Enums';

@Entity('miembros_grupo')
export class MiembroGrupo {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column('uuid')
	usuarioId!: string;

	@Column({ type: 'timestamp' })
	fechaIngreso!: Date;

	@Column({ type: 'timestamp', nullable: true })
	fechaSalida?: Date;

	@Column({ type: 'enum', enum: Estado, default: Estado.ACTIVO })
	estado!: Estado;

	@Column({ type: 'enum', enum: Rol })
	rol!: Rol;

	@ManyToOne(() => GrupoFamiliar, (grupo) => grupo.miembros, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'grupo_id' })
	grupo!: GrupoFamiliar;
}
