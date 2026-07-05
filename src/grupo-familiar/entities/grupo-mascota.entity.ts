import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GrupoFamiliar } from './grupo-familiar.entity';

@Entity('grupo_mascotas')
export class GrupoMascota {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column('uuid')
	mascotaId!: string;

	@Column({ type: 'timestamp' })
	fechaAgregado!: Date;

	@Column({ type: 'timestamp', nullable: true })
	fechaRemovido?: Date;

	@Column({ default: true })
	activo!: boolean;

	@ManyToOne(() => GrupoFamiliar, (grupo) => grupo.mascotas, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'grupo_id' })
	grupo!: GrupoFamiliar;
}
