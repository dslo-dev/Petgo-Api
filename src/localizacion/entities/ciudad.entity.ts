import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Ciudad {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'nombre_ciudad', type: 'varchar', length: 100, nullable: false })
	nombreCiudad!: string;
}
