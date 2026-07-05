import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Especie } from './especie.entity';
import { Raza } from './raza.entity';
import { Microchip } from './microchip.entity';

@Entity()
export class Mascota {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	nombre!: string;

	@Column('float')
	peso!: number;

	@Column()
	sexo!: string;

	@Column({ type: 'date' })
	nacimiento!: Date;

	@Column({ nullable: true })
	descripcionFisica!: string;

	@Column('uuid')
	creadoPor!: string;

	@ManyToOne(() => Especie, (especie) => especie.mascotas)
	especie!: Especie;

	@ManyToOne(() => Raza, (raza) => raza.mascotas)
	raza!: Raza;

	@OneToOne(() => Microchip, (microchip) => microchip.mascota, {
		cascade: true,
	})
	microchip!: Microchip;
}
