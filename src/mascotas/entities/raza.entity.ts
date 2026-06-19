import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Mascota } from './mascota.entity';

@Entity()
export class Raza {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	nombre!: string;

	@OneToMany(() => Mascota, (mascota) => mascota.raza)
	mascotas!: Mascota[];
}
