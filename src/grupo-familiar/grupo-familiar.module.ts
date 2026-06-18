import { Module } from '@nestjs/common';
import { GrupoFamiliarController } from './controllers/grupo-familiar.controller';
import { GrupoFamiliarService } from './services/grupo-familiar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoFamiliar } from './entities/grupo-familiar.entity';
import { Invitacion } from './entities/invitacion.entity';
import { MiembroGrupo } from './entities/miembro-grupo.entity';

@Module({
	imports: [TypeOrmModule.forFeature([GrupoFamiliar, Invitacion, MiembroGrupo])],
	controllers: [GrupoFamiliarController],
	providers: [GrupoFamiliarService],
	exports: [GrupoFamiliarService],
})
export class GrupoFamiliarModule {}
