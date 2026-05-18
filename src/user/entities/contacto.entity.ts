import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Contacto {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'telefono_prin_contacto', type: 'varchar', length: 15 })
	telefonoPrincipal!: string;

	@Column({ name: 'telefono_seg_contacto', type: 'varchar', length: 15 })
	telefonoSegundario!: string;

	@Column({ name: 'email_contacto', type: 'varchar', length: 100 })
	email!: string;
}
