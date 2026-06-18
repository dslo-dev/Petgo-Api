import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Region } from './region.entity';
import { Comuna } from './comuna.entity';

@Entity()
export class Ciudad {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'nombre_ciudad', type: 'varchar', length: 100, nullable: false })
	nombreCiudad!: string;

	//Relaciones
	@OneToMany(() => Comuna, (comuna) => comuna.ciudad)
	comunas!: Comuna[];

	@ManyToOne(() => Region, (region) => region.ciudades)
	@JoinColumn({ name: 'fk_region' })
	region!: Region;
}
