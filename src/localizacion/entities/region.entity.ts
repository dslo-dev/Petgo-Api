import { Column, Entity, ManyToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Pais } from './pais.entity';
import { Ciudad } from './ciudad.entity';

@Entity()
export class Region {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'nombre_region', type: 'varchar', length: 100, nullable: false, unique: true })
	nombreRegion!: string;

	//relaciones
	@OneToMany(() => Ciudad, (ciudad) => ciudad.region)
	ciudades!: Ciudad[];

	@ManyToOne(() => Pais, (pais) => pais.regiones)
	@JoinColumn({ name: 'fk_pais' })
	pais!: Pais;
}
