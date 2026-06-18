import { Column, Entity, OneToOne,JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Direccion } from './direccion.entity';

@Entity()
export class Detalle {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'descripcion', type: 'varchar', length: 255, nullable: true })
	descripcion!: string;

	@Column({ name: 'edificio', type: 'bit', nullable: true })
	isEdificio!: boolean;

	@Column({ name: 'torre', type: 'varchar', length: 2, nullable: true })
	torre!: string;

	@OneToOne(() => Direccion)
	@JoinColumn({ name: 'fk_direccion' })
	direccion!: Direccion;
}
