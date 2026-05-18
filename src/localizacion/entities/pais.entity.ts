import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Region } from './region.entity';

@Entity()
export class Pais {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'nombre_pais', type: 'varchar', length: 100, nullable: false, unique: true })
	nombrePais!: string;

	@Column({ name: 'continente_pais', type: 'varchar', length: 100, nullable: false })
	continentePais!: string;

	@OneToMany(() => Region, (region) => region.pais)
	regiones!: Region[];
}
