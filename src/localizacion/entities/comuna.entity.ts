import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ciudad } from './ciudad.entity';
import { Direccion } from './direccion.entity';

@Entity()
export class Comuna {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'nombre_comuna', type: 'varchar', length: 100, nullable: false })
	nombreComuna!: string;

	//relaciones
	@OneToMany(() => Direccion, (direccion) => direccion.comuna)
	@JoinColumn({ name: 'fk_direccion' })
	direcciones!: Direccion[];

	@ManyToOne(() => Ciudad, (ciudad) => ciudad.comunas)
	@JoinColumn({ name: 'fk_ciudad' })
	ciudad!: Ciudad;
}
