import { Body, Controller, Param, Post } from '@nestjs/common';

import { InvitacionService } from '../services/invitacion.service';

import { CreateInvitacionDto } from '../dto/invitacion/create-invitacion.dto';

@Controller('invitaciones')
export class InvitacionController {
	constructor(private readonly invitacionService: InvitacionService) {}

	@Post()
	crear(
		@Body()
		dto: CreateInvitacionDto,
	) {
		return this.invitacionService.crear(dto);
	}

	@Post(':id/aceptar')
	aceptar(
		@Param('id')
		id: string,
	) {
		return this.invitacionService.aceptar(id);
	}

	@Post(':id/rechazar')
	rechazar(
		@Param('id')
		id: string,
	) {
		return this.invitacionService.rechazar(id);
	}
}
