import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Mascota } from './mascota.entity';

@Entity()
export class Especie {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	nombre!: string;

	@OneToMany(() => Mascota, (mascota) => mascota.especie)
	mascotas!: Mascota[];
}
