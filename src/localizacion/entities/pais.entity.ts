import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Pais {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'nombre_pais', type: 'varchar', length: 100, nullable: false, unique: true })
	nombrePais!: string;

	@Column({ name: 'continente_pais', type: 'varchar', length: 100, nullable: false })
	continentePais!: string;
}
