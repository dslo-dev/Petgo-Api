import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Comuna } from './comuna.entity';
import { Detalle } from './detalle.entity';
import { Perfil } from 'src/user/entities/perfil.entity';

@Entity()
export class Direccion {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ name: 'calle_direccion', type: 'varchar', length: 100, nullable: false })
	calle!: string;

	@Column({ name: 'numero_direccion', type: 'varchar', length: 5, nullable: false })
	numero!: string; /* Es un string pq el numero de la puede llegar a una letra segun la organizacion del pais */

	@ManyToOne(() => Comuna, (comuna) => comuna.direcciones)
	@JoinColumn({ name: 'fk_comuna' })
	comuna!: Comuna;
	//Relaciones
	@OneToOne(() => Detalle)
	detalle!: Detalle;

	@OneToOne(() => Perfil)
	@JoinColumn({ name: 'perfil_fk' })
	perfil!: Perfil;
}
