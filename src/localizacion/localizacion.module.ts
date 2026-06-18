import { Module } from '@nestjs/common';
import { LocalizacionService } from './localizacion.service';
import { LocalizacionController } from './localizacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { Comuna } from './entities/comuna.entity';
import { Detalle } from './entities/detalle.entity';
import { Direccion } from './entities/direccion.entity';
import { Pais } from './entities/pais.entity';
import { Region } from './entities/region.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Ciudad, Comuna, Detalle, Direccion, Pais, Region])],
	controllers: [LocalizacionController],
	providers: [LocalizacionService],
})
export class LocalizacionModule {}
