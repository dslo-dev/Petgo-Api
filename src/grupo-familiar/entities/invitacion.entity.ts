import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { GrupoFamiliar } from './grupo-familiar.entity';
import { Estado } from '../../common/Enums';

@Entity('invitaciones')
export class Invitacion {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column('uuid')
	usuarioId!: string;

	@Column({
		type: 'timestamp',
	})
	fechaInvitacion!: Date;

	@Column({ type: 'timestamp', nullable: true })
	fechaRespuesta?: Date;

	@Column({ type: 'enum', enum: Estado, default: Estado.ACTIVO })
	estado!: Estado;

	@ManyToOne(() => GrupoFamiliar, (grupo) => grupo.invitaciones, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'grupo_id' })
	grupo!: GrupoFamiliar;
}
