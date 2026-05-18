import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contacto } from './contacto.entity';

@Entity()
export class Perfil {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	avatar!: string;

	@Column({ name: 'nombre_perfil', type: 'varchar', length: '100' })
	nombre!: string;

	@Column({ name: 'appt_perfil', type: 'varchar', length: '70' })
	appat!: string;

	@Column({ name: 'apmat_perfil', type: 'varchar', length: '70' })
	apmat!: string;

	@Column({ name: 'nacimiento_perfil', type: 'date' })
	nacimiento!: Date;

	@OneToOne(() => Contacto, { cascade: true })
	@JoinColumn()
	contacto!: Contacto;
}
