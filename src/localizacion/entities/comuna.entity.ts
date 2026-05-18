import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Comuna {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'nombre_comuna', type: 'varchar', length: 100, nullable: false })
	nombreComuna!: string;
}
