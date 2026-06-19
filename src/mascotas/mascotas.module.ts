import { Module } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { MascotasController } from './mascotas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especie } from './entities/especie.entity';
import { Mascota } from './entities/mascota.entity';
import { Raza } from './entities/raza.entity';
import { Microchip } from './entities/microchip.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Especie, Raza, Mascota, Microchip])],
	controllers: [MascotasController],
	providers: [MascotasService],
})
export class MascotasModule {}
