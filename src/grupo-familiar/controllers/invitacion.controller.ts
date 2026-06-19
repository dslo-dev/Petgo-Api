import { Body, Controller, Param, Post } from '@nestjs/common';

import { InvitacionService } from '../services/invitacion.service';
import { CreateInvitacionDto } from '../dto/invitacion/create-invitacion.dto';

import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Invitaciones')
@Controller('invitaciones')
export class InvitacionController {
	constructor(private readonly invitacionService: InvitacionService) {}

	@Post()
	@ApiOperation({ summary: 'Crear una invitación' })
	@ApiResponse({ status: 201, description: 'Invitación creada correctamente' })
	crear(@Body() dto: CreateInvitacionDto) {
		return this.invitacionService.crear(dto);
	}

	@Post(':id/aceptar')
	@ApiOperation({ summary: 'Aceptar una invitación' })
	@ApiParam({ name: 'id', description: 'ID de la invitación' })
	@ApiResponse({ status: 200, description: 'Invitación aceptada' })
	aceptar(@Param('id') id: string) {
		return this.invitacionService.aceptar(id);
	}

	@Post(':id/rechazar')
	@ApiOperation({ summary: 'Rechazar una invitación' })
	@ApiParam({ name: 'id', description: 'ID de la invitación' })
	@ApiResponse({ status: 200, description: 'Invitación rechazada' })
	rechazar(@Param('id') id: string) {
		return this.invitacionService.rechazar(id);
	}
}
