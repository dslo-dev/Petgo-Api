import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Mascota } from './mascota.entity';

@Entity()
export class Microchip {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ unique: true })
	codigo!: string;

	@OneToOne(() => Mascota, (mascota) => mascota.microchip)
	@JoinColumn()
	mascota!: Mascota;
}
