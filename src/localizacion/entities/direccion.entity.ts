import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Direccion {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'calle_direccion', type: 'varchar', length: 100, nullable: false })
	calle!: string;

	@Column({ name: 'numero_direccion', type: 'varchar', length: 5, nullable: false })
	numero!: string; /* Es un string pq el numero de la puede llegar a una letra segun la organizacion del pais */
}
