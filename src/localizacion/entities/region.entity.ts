import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Region {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'nombre_region', type: 'varchar', length: 100, nullable: false, unique: true })
	nombreRegion!: string;
}
