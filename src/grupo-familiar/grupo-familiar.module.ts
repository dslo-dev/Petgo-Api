import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GrupoFamiliarController } from './controllers/grupo-familiar.controller';
import { InvitacionController } from './controllers/invitacion.controller';
import { MiembroController } from './controllers/miembro.controller';
import { GroupPetsController } from './controllers/group-pets.controller';

import { GrupoFamiliarService } from './services/grupo-familiar.service';
import { InvitacionService } from './services/invitacion.service';
import { MiembroService } from './services/miembro.service';
import { GroupPetsService } from './services/group-pets.service';
import { MascotasClientService } from '../common/clients/mascotas-client.service';

import { GrupoFamiliar } from './entities/grupo-familiar.entity';
import { Invitacion } from './entities/invitacion.entity';
import { MiembroGrupo } from './entities/miembro-grupo.entity';
import { GrupoMascota } from './entities/grupo-mascota.entity';

@Module({
	imports: [TypeOrmModule.forFeature([GrupoFamiliar, Invitacion, MiembroGrupo, GrupoMascota])],
	controllers: [
		GrupoFamiliarController,
		InvitacionController,
		MiembroController,
		GroupPetsController,
	],
	providers: [
		GrupoFamiliarService,
		InvitacionService,
		MiembroService,
		GroupPetsService,
		MascotasClientService,
	],
	exports: [GrupoFamiliarService, MiembroService],
})
export class GrupoFamiliarModule {}
